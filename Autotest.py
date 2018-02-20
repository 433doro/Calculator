import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from time import sleep

class SimpleCalcNoNegatives(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("C:/Users/Dell/Documents/Calculator/chromedriver.exe")
    
    def test_simpleCalculation(self):
        driver = self.driver
        driver.get("C:/Users/Dell/Documents/Calculator/index.html")

        sleep(5)

        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"7")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.XPATH,"//button[@value='0']")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.XPATH,"//button[@value='+']")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"2")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"6")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"eqn-bg")))).click()
        
        element = driver.find_element_by_id("result")
        result = int(element.text)
        self.assertEqual(96,result,"oh snap!")

        sleep(5)

    def tearDown(self):
        self.driver.close()

    sleep(5)


    def setUp(self):
        self.driver = webdriver.Chrome("C:/Users/Dell/Documents/Calculator/chromedriver.exe")
    
    
    def test_minusOperatorCalculation(self):
        driver = self.driver
        driver.get("C:/Users/Dell/Documents/Calculator/index.html")
        
        sleep(10)

        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.XPATH,"//button[@value='delete']")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"-")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"2")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.XPATH,"//button[@value='+']")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"6")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"eqn-bg")))).click()

        element = driver.find_element_by_id("result")
        result = int(element.text)
        self.assertEqual(4,result,"oh snap!")


    def tearDown(self):
        self.driver.close()

    sleep(5)

    def setUp(self):
        self.driver = webdriver.Chrome("C:/Users/Dell/Documents/Calculator/chromedriver.exe")

    def test_complexedCalculation(self):
        driver = self.driver
        driver.get("C:/Users/Dell/Documents/Calculator/index.html")
        
        sleep(5)

        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.XPATH,"//button[@value='delete']")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"-")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"2")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.XPATH,"//button[@value='+']")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"6")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"/")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"2")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"*")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"5")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"eqn-bg")))).click()

        element = driver.find_element_by_id("result")
        result = int(element.text)
        self.assertEqual(10,result,"oh snap!")


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()