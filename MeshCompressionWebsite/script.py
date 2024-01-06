# Import libraries
import numpy as np
import matplotlib.pyplot as plt
from package.Vertices import vertices
from scipy.fft import dct, idct
from pyscript import display
from js import document

# vertices = [-0.5960244, -0.5912368, -0.5960244, -0.5744998, -0.5744998, 0.5744999, -0.5744998, 0.5744999, -0.5744998]

def reduceTo(vertices, amount):
    vertices = np.array(vertices).reshape(-1, 3)
    count = int(len(vertices) * amount)
    window = np.zeros((len(vertices), 3))
    window[:count] = 1
    y = dct(vertices, norm = 'ortho')
    yr = idct(y * window, norm = 'ortho')
    yr = yr.flatten().tolist()
    return yr[0:count*3]


# Creating dataset
z = np.array(vertices[0::3])
x = np.array(vertices[1::3])
y = np.array(vertices[2::3])
 
# Creating figure
fig = plt.figure(figsize = (10, 7))
ax = plt.axes(projection ="3d")
 
# Creating plot
ax.scatter3D(x, y, z, color = "green")
plt.suptitle("simple 3D scatter plot")
plt.title(f"{len(vertices)/3} vertices")

document.getElementById("spinloader").style.display = 'none'
document.getElementById("update").style.display = "inline-block"

# show plot
display(plt, target="mpl")

def createNewPlot(event):
    print("Called")
    img = document.querySelector("img")
    img.parentNode.removeChild(img)
    amount = 1 - int(document.getElementById('compression').value)/100
    verts = reduceTo(vertices, amount)
    print(amount)
    z = np.array(verts[0::3])
    x = np.array(verts[1::3])
    y = np.array(verts[2::3])
    
    # Creating figure
    fig = plt.figure(figsize = (10, 7))
    ax = plt.axes(projection ="3d")
    
    # Creating plot
    ax.scatter3D(x, y, z, color = "green")
    plt.suptitle("simple 3D scatter plot")
    plt.title(f"{len(verts)/3} vertices")

    # show plot
    display(plt, target="mpl")