import base64
import numpy as np
import io
from PIL import Image
from flask import Flask, render_template, redirect,request
import tensorflow as tf
from tensorflow import keras
from keras.layers import Input, Conv2D, Conv2DTranspose,LeakyReLU, Activation, Concatenate, Dropout, BatchNormalization, MaxPooling2D
from keras.optimizers import Adam
from keras.initializers import RandomNormal
from keras.models import Model
from keras.preprocessing.image import load_img
import numpy as np
import matplotlib.pyplot as plt 


def define_encoder_block(layer_in,n_filters,batchnorm=True):
    
    init=RandomNormal(stddev=0.02,seed=1)

    g=Conv2D(n_filters,(4,4),strides=(2,2),padding='same',kernel_initializer=init)(layer_in)
    if batchnorm:
        g=BatchNormalization()(g,training=True)
    g=LeakyReLU(alpha=0.2)(g)
    
    return g

def define_decoder_block(layer_in,skip_in,n_filters,dropout=True):
    
    init=RandomNormal(stddev=0.02,seed=1)

    g=Conv2DTranspose(n_filters,(4,4),strides=(2,2),padding='same',kernel_initializer=init)(layer_in)
    g=BatchNormalization()(g,training=True)
    if dropout:
        g=Dropout(0.5)(g,training=True)
    g=Concatenate()([g,skip_in])
    g=Activation('relu')(g)

    return g

def define_generator(image_shape=(256,256,3)):

    init=RandomNormal(stddev=0.02,seed=1)

    in_image=Input(shape=image_shape)

    e1=define_encoder_block(in_image,64,batchnorm=False)
    e2=define_encoder_block(e1,128)
    e3=define_encoder_block(e2,256)
    e4=define_encoder_block(e3,512)
    e5=define_encoder_block(e4,512)
    e6=define_encoder_block(e5,512)
    e7=define_encoder_block(e6,512)

    b=Conv2D(512,(4,4),strides=(2,2),padding='same',kernel_initializer=init)(e7)
    b=Activation('relu')(b)

    d1=define_decoder_block(b,e7,512)
    d2=define_decoder_block(d1,e6,512)
    d3=define_decoder_block(d2,e5,512)
    d4=define_decoder_block(d3,e4,512,dropout=False)
    d5=define_decoder_block(d4,e3,256,dropout=False)
    d6=define_decoder_block(d5,e2,128,dropout=False)
    d7=define_decoder_block(d6,e1,64,dropout=False)

    g=Conv2DTranspose(image_shape[2],(4,4),strides=(2,2),padding='same',kernel_initializer=init)(d7)
    out_image=Activation('tanh')(g)

    model=Model(in_image,out_image)
    return model



g_model=define_generator((256,256,3))
g_model.load_weights(r"C:\Users\Ali Rashid\Desktop\Generative-Minds\g_model_052000.h5")


app = Flask(__name__)

@app.route('/')
def upload_form():
    return render_template('upload.html')


@app.route('/predicted_image',methods=['POST'])
def generated():
    if 'drawing' not in request.files:
        return redirect(request.url)  #Return to the same url from where the request came from
    
    drawing_file= request.files['drawing']
    if drawing_file.filename == '':
        return redirect(request.url)
    
    if drawing_file:
        image = Image.open(drawing_file)
        image = image.convert('RGB')
        image = image.resize((256,256))
        image_array = np.array(image) / 127.5 - 1 #Normalise the image to [-1,1]

        img = g_model.predict(np.expand_dims(image_array, axis=0))

        res = Image.fromarray(np.uint8((img[0] + 1) * 127.5)) #De-normalise the image to [0,255] range 

    
        image_io = io.BytesIO()
        res.save(image_io, format='JPEG') #This saves the image in-memory of the server as a JPEG file

        image_io.seek(0)

        # Pass the image data to the HTML template
        image_url = "data:image/jpeg;base64," + base64.b64encode(image_io.read()).decode('utf-8')

        return render_template('index.html', image_url=image_url)


if __name__ == '__main__':
    app.run(debug=True)
