import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

class SimpleCalcNoNegatives(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("C:/Users/Dell/Documents/Calculator/chromedriver.exe")

    def simpleCalculation(self):
        driver = self.driver
        driver.get("C:/Users/Dell/Documents/Calculator/index.HTML")
        
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"9")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"-")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"2")))).click()
        WebDriverWait(driver,5).until((EC.presence_of_element_located((By.ID,"eqn-bg")))).click()
        element = driver.find_element_by_id("result")
        result = int(element.text)
        assert  7 not in result


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()