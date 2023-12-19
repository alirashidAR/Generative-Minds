import PIL.Image as Image
import matplotlib.pyplot as plt

image = Image.open(r"C:\Users\Ali Rashid\Desktop\DATA\processed_dataset\image_gan_in_final\1.png")
image = image.convert("RGB")
plt.imshow(image)
plt.show()
