import os
from subprocess import call, check_output
import threading
import time

def take_photo():
    #Invokes adb via shell and takes photo.
    res = call(['adb', 'shell', 'am start -a android.media.action.IMAGE_CAPTURE'])
    time.sleep(1)
    res = call(['adb', 'shell', 'input keyevent KEYCODE_FOCUS'])
    time.sleep(1)
    res = call(['adb', 'shell', 'input keyevent KEYCODE_CAMERA'])

def get_photo_name():
    res = check_output(['adb', 'shell', 'ls', '/sdcard/DCIM/Camera'])
    photo = res.replace('\n', '').split(' ')
    if photo:
        return photo[0]
    else:
        return None

def pull_photo(photo):
    #Invokes adb pull via shell to pull the last taken photo
    path_to_save = '/tmp/{}'.format(photo)
    res = call(['adb', 'pull', '/sdcard/DCIM/Camera/{}'.format(photo), path_to_save])

def clean_up_photo(photo):
    res = check_output(['adb', 'shell', 'rm', '/sdcard/DCIM/Camera/{}'.format(photo)])
    res = check_output(['rm', '/tmp/{}'.format(photo)])

def threaded_loop():
    take_photo()
    photo = get_photo_name()
    pull_photo(photo)
    clean_up_photo(photo)
    threading.Timer(10, threaded_loop).start()

take_photo()
threaded_loop()