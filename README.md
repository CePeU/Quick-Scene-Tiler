A little module to cut a Foundry VTT scene into tiles and replace the scene map with those tiles.   
This allows even older tabletts to view high resolution maps which would otherwise be inaccessible due to the fact that they will exceed the texture size of the tablett. You will find a new button in the tiles layer controls.

You can check the GPU texture size of your device like this for example.
Open this site with your device and your browser:
https://webglreport.com/

Then search for a blue box called Textures.
There you find "Max Texture Size". This is the information you need. It tells you how big of a resolution your GPU can handle.   
In the Quick-Scene-Tiler module this is the number you should not EXCEDE.
If you use several devices you need to use the number of the device with the lowest number.
