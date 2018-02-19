from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from time import sleep
from socket import socket

 def get_socket():
     sock = socket()
     sock.bind(("localhost",1996))
     sock.listen(3)
     return sock.accept()[0]

	  
  try:
	  sock = get_socket()
      driver = webdriver.Chrome()
      driver.get("http://localhost/")
      sock.sendall("webdriver started")
      WebDriverWait(driver,30).until((EC.presence_of_element_located((By.ID,"-")))).click()
      sock.sendall("finished clicking")

  finally:
      dirver.close()
      sock.sendall("My work here is done")
	  sock.close()

