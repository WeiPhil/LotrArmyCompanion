from PyQt5 import QtGui, QtCore, QtWidgets, uic
from PyQt5.QtWidgets import *
import sys
import os

import smtplib
from os.path import basename
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formatdate
from email import encoders
import base64

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

welcomeWindow = resource_path('ressources/welcomeWindow.ui')
Ui_MainWindow, _ = uic.loadUiType(welcomeWindow)

unitForm = resource_path('ressources/unitForm.ui')
Ui_UnitForm, _ = uic.loadUiType(unitForm)

equipementForm = resource_path('ressources/equipementForm.ui')
Ui_EquipementForm, _ = uic.loadUiType(equipementForm)

specialRuleForm = resource_path('ressources/specialRuleForm.ui')
Ui_SpecialRuleForm, _ = uic.loadUiType(specialRuleForm)

magicalPowerForm = resource_path('ressources/magicalPowerForm.ui')
Ui_MagicalPowerForm, _ = uic.loadUiType(magicalPowerForm)

keywordsRanks = ['warrior', 'hero_of_legend', 'hero_of_valor',
                 'hero_of_fortitude', 'minor_hero', 'independent_hero']
keywordsTypes = ['infantry', 'cavalry', 'monster']
keywordsRaces = ['hobbit', 'elf', 'orc', 'pony', 'warg', 'goblin', 'wizard', 'man', 'dwarf', 'spirit', 'ringwraith', 'spider', 'troll',
                 'siege_engine', 'uruk-hai', 'great_beast', 'war_beast', 'drake', 'dragon', 'kraken', 'bat', 'mûmak', 'pony', 'ent', 'eagle']
keywordsForces = ['gondor', 'mirkwood', 'erebor', 'númenor', 'arnor', 'rohan', 'rivendell', 'lórien', 'khazad-dûm', 'moria',
                  'iron_hills', 'mordor', 'angmar', 'easterling', 'isengard', 'dunlending', 'khandish', 'haradrim', 'mahûd', 'corsair', 'ruffian']

heroicActionsList = ['heroic_resolve', 'heroic_march','heroic_channelling', 'heroic_accuracy', 'heroic_strike', 'heroic_defence', 'heroic_strength', 'heroic_challenge']

wargearList = []
wargearListFilename = resource_path('ressources/wargearList.txt')
wargearSQLFile = resource_path('ressources/wargearQueries.sql')
with open(wargearListFilename, encoding='utf8') as file:
    wargearList = [line.rstrip('\n') for line in file]

specialRulesList = []
specialRulesListFilename = resource_path('ressources/specialRulesList.txt')
specialRulesSQLFile = resource_path('ressources/specialRulesQueries.sql')
with open(specialRulesListFilename, encoding='utf8') as file:
    specialRulesList = [line.rstrip('\n') for line in file]

magicalPowersList = []
magicalPowersListFilename = resource_path('ressources/magicalPowersList.txt')
magicalPowersSQLFile = resource_path('ressources/magicalPowersQueries.sql')
with open(magicalPowersListFilename, encoding='utf8') as file:
    magicalPowersList = [line.rstrip('\n') for line in file]

unitsList = []
unitsListFilename = resource_path('ressources/unitsList.txt')
unitsSQLFile = resource_path('ressources/unitsQueries.sql')
with open(unitsListFilename, encoding='utf8') as file:
    unitsList = [line.rstrip('\n') for line in file]


class SendMailRunnable(QtCore.QRunnable):
    def __init__(self, popUp, subject, text, files=None):
        super(SendMailRunnable, self).__init__()
        self.popUp = popUp
        self.subject = subject
        self.text = text
        self.files = files

    def run(self):
        gmail_user = 'lotr.armycompanion@gmail.com'
        gmail_password = 'Lotr123ArmyCompanion'
        server = 'smtp.gmail.com'

        msg = MIMEMultipart()
        msg['From'] = gmail_user
        msg['To'] = gmail_user
        msg['Date'] = formatdate(localtime=True)
        msg['Subject'] = self.subject

        infoMessage = ""
        error = False
        try:
            for f in self.files or []:
                with open(f, "rb") as file:
                    part = MIMEApplication(file.read(), Name=basename(f))
                # After the file is closed
                part['Content-Disposition'] = 'attachment; filename="%s"' % basename(f)
                encoders.encode_base64(part)
                msg.attach(part)
            
            msg.attach(MIMEText(self.text))
        
            smtp = smtplib.SMTP_SSL(server, 465)
            smtp.login(gmail_user, gmail_password)
            smtp.sendmail(gmail_user, gmail_user, msg.as_string())
            smtp.close()
            infoMessage = "Mail Sent!"
            error = False
        except:
            error = True
            infoMessage = "Something Went Wrong... Contact Philippe!"

        if(not error):
            with open(unitsSQLFile, "w", encoding='utf8') as file:
                file.write("-- Units Queries --\n")
            with open(specialRulesSQLFile, "w", encoding='utf8') as file:
                file.write("-- Special Rules queries --\n")
            with open(magicalPowersSQLFile, "w", encoding='utf8') as file:
                file.write("-- Magical Power queries --\n")
            with open(wargearSQLFile, "w", encoding='utf8') as file:
                file.write("-- Equipement queries --\n")

        QtCore.QMetaObject.invokeMethod(self.popUp, "setText",QtCore.Qt.QueuedConnection,QtCore.Q_ARG(str, infoMessage))
        # wait 2 seconds
        loop = QtCore.QEventLoop()
        QtCore.QTimer.singleShot(1500, loop.quit)
        loop.exec_()
        # call the close method of the popup
        QtCore.QMetaObject.invokeMethod(self.popUp, "close", QtCore.Qt.QueuedConnection)

class WaitPopUp(QDialog):
    def __init__(self, *args, **kwargs):
        QDialog.__init__(self, *args, **kwargs)
        self.setLayout(QVBoxLayout())
        self.setModal(True)
        self.setWindowFlags(QtCore.Qt.FramelessWindowHint);
        self.label = QLabel(self)
        self.layout().addWidget(self.label)

    @QtCore.pyqtSlot(str)
    def setText(self, text):
        self.label.setText(text)

def addUnitToFiles(unitObject):
    # to text files
    unitsList.append(unitObject["name"])
    with open(unitsListFilename, "a", encoding='utf8') as file:
        file.write("\n"+unitObject["name"])
    # to sql query

    # header
    with open(unitsSQLFile, "a", encoding='utf8') as file:
        file.write("-- New Unit: "+unitObject["name"]+"\n")

    # unit
    sqlQuery = """INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='{0}'),
        '{1}',{2},
        {3},{4},{5},{6},{7},{8},{9},{10},
        '{11}',
        'tempCardBackground2.jpg');\n\n"""
    sqlQuery = sqlQuery.format(
        unitObject["faction"],
        unitObject["name"],unitObject["points"],
        unitObject["move"],unitObject["fight"],unitObject["shoot"],unitObject["strength"],unitObject["defence"],unitObject["attacks"],unitObject["wounds"],unitObject["courage"],
        unitObject["description"])
    with open(unitsSQLFile, "a", encoding='utf8') as file:
        file.write(sqlQuery)

    # keywords links
    sqlQuery = """INSERT INTO unit_has_keyword (unit_id,keyword_id)\n\tVALUES\n"""
    for keyword in unitObject["keywords"]:
        temp = """\t\t((SELECT unit_id FROM unit WHERE name='{0}'),(SELECT keyword_id FROM keyword WHERE name='{1}')),\n"""
        sqlQuery = sqlQuery + temp.format(unitObject["name"],keyword)
    sqlQuery = sqlQuery[:-2] + ';\n\n'
    with open(unitsSQLFile, "a", encoding='utf8') as file:
        file.write(sqlQuery)
    
    
    # wargear link
    sqlQuery = """INSERT INTO unit_has_equipement (unit_id,equipement_id,points)\n\tVALUES\n"""
    for equipement,points in unitObject["wargear"]:
        temp = """\t\t((SELECT unit_id FROM unit WHERE name='{0}'),(SELECT equipement_id FROM equipement WHERE name='{1}'),{2}),\n"""
        sqlQuery = sqlQuery + temp.format(unitObject["name"],equipement,points)
    sqlQuery = sqlQuery[:-2] + ';\n\n'
    with open(unitsSQLFile, "a", encoding='utf8') as file:
        file.write(sqlQuery)
  
    # special rules links
    if(len(unitObject["specialRules"]) > 0 ):
        sqlQuery = """INSERT INTO unit_has_special_rule (unit_id,special_rule_id)\n\tVALUES\n"""
        for specialRule in unitObject["specialRules"]:
            temp = """\t\t((SELECT unit_id FROM unit WHERE name='{0}'),(SELECT special_rule_id FROM special_rule WHERE name='{1}')),\n"""
            sqlQuery = sqlQuery + temp.format(unitObject["name"],specialRule)
        sqlQuery = sqlQuery[:-2] + ';\n\n'
        with open(unitsSQLFile, "a", encoding='utf8') as file:
            file.write(sqlQuery)

    # magical powers links
    if(len(unitObject["magicalPowers"]) > 0 ):
        sqlQuery = """INSERT INTO unit_has_magical_power (unit_id,magical_power_id)\n\tVALUES\n"""
        for magicalPower in unitObject["magicalPowers"]:
            temp = """\t\t((SELECT unit_id FROM unit WHERE name='{0}'),(SELECT magical_power_id FROM magical_power WHERE name='{1}')),\n"""
            sqlQuery = sqlQuery + temp.format(unitObject["name"],magicalPower)
        sqlQuery = sqlQuery[:-2] + ';\n\n'
        with open(unitsSQLFile, "a", encoding='utf8') as file:
            file.write(sqlQuery)


def addEquipementToFiles(equipementObject):
    wargearList.append(equipementObject["name"])
    with open(wargearListFilename, "a", encoding='utf8') as file:
        file.write("\n"+equipementObject["name"])

    # to sql query
    # header
    with open(wargearSQLFile, "a", encoding='utf8') as file:
        file.write("-- New Equipement: "+equipementObject["name"]+"\n")

    # unit
    sqlQuery = """INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('{0}','{1}',{2},'{3}','{4}',NULL);\n\n"""
    sqlQuery = sqlQuery.format(
        equipementObject["name"],equipementObject["description"],equipementObject["low_cost"],equipementObject["high_cost"],equipementObject["isExtra"])
    with open(wargearSQLFile, "a", encoding='utf8') as file:
        file.write(sqlQuery)

    # special rules links
    if(len(equipementObject["specialRules"]) > 0 ):
        sqlQuery = """INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)\n\tVALUES\n"""
        for specialRule in equipementObject["specialRules"]:
            temp = """\t\t((SELECT equipement_id FROM equipement WHERE name='{0}'),(SELECT special_rule_id FROM special_rule WHERE name='{1}')),\n"""
            sqlQuery = sqlQuery + temp.format(equipementObject["name"],specialRule)
        sqlQuery = sqlQuery[:-2] + ';\n\n'
        with open(wargearSQLFile, "a", encoding='utf8') as file:
            file.write(sqlQuery)

def addMagicalPowerToFiles(magicalPowerObject):
    magicalPowersList.append(magicalPowerObject["name"])
    with open(magicalPowersListFilename, "a", encoding='utf8') as file:
        file.write("\n"+magicalPowerObject["name"])

    # to sql query
    # header
    with open(magicalPowersSQLFile, "a", encoding='utf8') as file:
        file.write("-- New Magical Power: "+magicalPowerObject["name"]+"\n")

    # unit
    sqlQuery = """INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('{0}','{1}',
         '{2}',
         '{3}');\n\n"""
    sqlQuery = sqlQuery.format(
        magicalPowerObject["name"],magicalPowerObject["description"],magicalPowerObject["description_channelled"],magicalPowerObject["duration"])
    with open(magicalPowersSQLFile, "a", encoding='utf8') as file:
        file.write(sqlQuery)

def addSpecialRuleToFiles(specialRuleObject):
    specialRulesList.append(specialRuleObject["name"])
    with open(specialRulesListFilename, "a", encoding='utf8') as file:
        file.write("\n"+specialRuleObject["name"])

    # to sql query
    # header
    with open(specialRulesSQLFile, "a", encoding='utf8') as file:
        file.write("-- New Special Rule: "+specialRuleObject["name"]+"\n")

    # unit
    sqlQuery = """INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('{0}','{1}',
         '{2}',
         '{3}');\n\n"""
    sqlQuery = sqlQuery.format(
        specialRuleObject["name"],specialRuleObject["type"],specialRuleObject["description"],specialRuleObject["origin"])
    with open(specialRulesSQLFile, "a", encoding='utf8') as file:
        file.write(sqlQuery)

def prettify(string):
    first, *rest = string.split('_')
    return first.capitalize() + "".join(" "+word for word in rest)


def sanitize(string):
    first, *rest = string.split(' ')
    return first.lower() + "".join("_"+word.lower() for word in rest)

def sanitizeText(string):
    return string.replace("'","''") 


def prettifyList(list):
    return [prettify(string) for string in list]


class WelcomeWindow(QtWidgets.QMainWindow, Ui_MainWindow):
    def showUnitWindow(self, y):
        self.anotherwindow = UnitForm()
        self.anotherwindow.setModal(True)
        self.anotherwindow.setWindowTitle("New Unit")
        self.anotherwindow.show()

    def showEquipementWindow(self, y):
        self.anotherwindow = EquipementForm()
        self.anotherwindow.setModal(True)
        self.anotherwindow.setWindowTitle("New Equipement")
        self.anotherwindow.show()

    def showMagicalPowerWindow(self, y):
        self.anotherwindow = MagicalPowerForm()
        self.anotherwindow.setModal(True)
        self.anotherwindow.setWindowTitle("New Magical Power")
        self.anotherwindow.show()

    def showSpecialRuleWindow(self, y):
        self.anotherwindow = SpecialRuleForm()
        self.anotherwindow.setModal(True)
        self.anotherwindow.setWindowTitle("New Special Rule")
        self.anotherwindow.show()

    def sendAllData(self):
        waitPopUp = WaitPopUp()
        waitPopUp.show()
        waitPopUp.setText("Please Wait...")
        runnable = SendMailRunnable(waitPopUp,"New Queries for Database, id : "+ str(base64.urlsafe_b64encode(os.urandom(6)).decode()), "", [wargearSQLFile,unitsSQLFile,specialRulesSQLFile,magicalPowersSQLFile])
        QtCore.QThreadPool.globalInstance().start(runnable)


    def __init__(self):
        QtWidgets.QMainWindow.__init__(self)
        Ui_MainWindow.__init__(self)
        self.setupUi(self)


class SpecialRuleForm(QtWidgets.QDialog, Ui_SpecialRuleForm):

    def checkNameNotExists(self):
        name = sanitize(self.nameInput.text())
        if(name in specialRulesList):
            self.hintName.show()
        else:
            self.hintName.hide()

    def checkFormAndSave(self):
        specialRuleObject = {}
        specialRuleObject["name"] = sanitize(self.nameInput.text())
        specialRuleObject["type"] = sanitize(self.typeComboBox.currentText())
        specialRuleObject["description"] = sanitizeText(self.description.toPlainText())
        specialRuleObject["origin"] = sanitize(self.originComboBox.currentText())

        valid = True
        if(specialRuleObject['name'] == '' or specialRuleObject['description'] == ''):
            valid = False

        infoDialog = QDialog()
        infoDialog.setLayout(QVBoxLayout(infoDialog))
        infoDialog.setModal(True)
        infoDialog.setWindowFlags(QtCore.Qt.FramelessWindowHint);
        infoDialog.label = QLabel(infoDialog)
        infoDialog.layout().addWidget(infoDialog.label)
        if(valid):
            addSpecialRuleToFiles(specialRuleObject)
            infoDialog.label.setText("Successfully added special rule to files!")
            infoDialog.show()
            loop = QtCore.QEventLoop()
            QtCore.QTimer.singleShot(2000, loop.quit)
            loop.exec_()
            infoDialog.close()
            self.accept()
        else:
            infoDialog.label.setText("Check your inputs something is wrong...")
            infoDialog.show()
            loop = QtCore.QEventLoop()
            QtCore.QTimer.singleShot(2000, loop.quit)
            loop.exec_()
            infoDialog.close()

    def confirmQuit(self):
        buttonReply = QtWidgets.QMessageBox.warning(
            self, 'Confirm quit', "Are you sure you want to quit?\nThis entry won't be saved.", QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No, QtWidgets.QMessageBox.No)
        if buttonReply == QtWidgets.QMessageBox.Yes:
            self.reject()

    def __init__(self):
        QtWidgets.QDialog.__init__(self)
        Ui_SpecialRuleForm.__init__(self)
        self.setupUi(self)
        self.hintName.hide()


class MagicalPowerForm(QtWidgets.QDialog, Ui_MagicalPowerForm):

    def checkNameNotExists(self):
        name = sanitize(self.nameInput.text())
        if(name in magicalPowersList):
            self.hintName.show()
        else:
            self.hintName.hide()

    def checkFormAndSave(self):
        magicalPowerObject = {}
        magicalPowerObject["name"] = sanitize(self.nameInput.text())
        magicalPowerObject["duration"] = sanitize(self.durationComboBox.currentText())
        magicalPowerObject["description"] = sanitizeText(self.description.toPlainText())
        magicalPowerObject["description_channelled"] = sanitizeText(self.channelledDescription.toPlainText())

        valid = True
        if(magicalPowerObject['name'] == '' or magicalPowerObject['description'] == '' or magicalPowerObject['description_channelled'] == ''):
            valid = False

        infoDialog = QDialog()
        infoDialog.setLayout(QVBoxLayout(infoDialog))
        infoDialog.setModal(True)
        infoDialog.setWindowFlags(QtCore.Qt.FramelessWindowHint);
        infoDialog.label = QLabel(infoDialog)
        infoDialog.layout().addWidget(infoDialog.label)
        if(valid):
            addMagicalPowerToFiles(magicalPowerObject)
            infoDialog.label.setText("Successfully added magical power to files!")
            infoDialog.show()
            loop = QtCore.QEventLoop()
            QtCore.QTimer.singleShot(2000, loop.quit)
            loop.exec_()
            infoDialog.close()
            self.accept()
        else:
            infoDialog.label.setText("Check your inputs something is wrong...")
            infoDialog.show()
            loop = QtCore.QEventLoop()
            QtCore.QTimer.singleShot(2000, loop.quit)
            loop.exec_()
            infoDialog.close()

    def confirmQuit(self):
        buttonReply = QtWidgets.QMessageBox.warning(
            self, 'Confirm quit', "Are you sure you want to quit?\nThis entry won't be saved.", QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No, QtWidgets.QMessageBox.No)
        if buttonReply == QtWidgets.QMessageBox.Yes:
            self.reject()

    def __init__(self):
        QtWidgets.QDialog.__init__(self)
        Ui_MagicalPowerForm.__init__(self)
        self.setupUi(self)
        self.hintName.hide()


class EquipementForm(QtWidgets.QDialog, Ui_EquipementForm):

    def checkNameNotExists(self):
        name = sanitize(self.nameInput.text())
        if(name in wargearList):
            self.hintName.show()
        else:
            self.hintName.hide()

    def fillSpecialRulesComboBox(self):
        self.specialRulesComboBox.addItem("Special Rules")
        self.specialRulesComboBox.model().item(0).setEnabled(False)
        self.specialRulesComboBox.addItems(prettifyList(specialRulesList))
        self.specialRulesComboBox.setCurrentIndex(1)

    def createSpecialRule(self):
        self.anotherwindow = SpecialRuleForm()
        self.anotherwindow.setModal(True)
        self.anotherwindow.setWindowTitle("New Special Rule")
        result = self.anotherwindow.exec_()
        if(result == 1):
            newSpecialRule = sanitize(self.anotherwindow.nameInput.text())
            self.specialRulesComboBox.addItem(prettify(newSpecialRule))

    def addSpecialRule(self):
        newSpecialRule = self.specialRulesComboBox.currentText()
        if(self.specialRulesListWidget.findItems(newSpecialRule, QtCore.Qt.MatchFixedString) == []):
            self.specialRulesListWidget.insertItem(0, newSpecialRule)

    def removeSpecialRule(self):
        container = self.specialRulesListWidget
        container.takeItem(container.row(container.currentItem()))

    def checkFormAndSave(self):
        equipementObject = {}
        equipementObject["name"] = sanitize(self.nameInput.text())
        equipementObject["low_cost"] = self.lowCostSpinBox.cleanText()
        equipementObject["high_cost"] = self.highCostSpinBox.cleanText()

        specialRules = []
        container = self.specialRulesListWidget
        for i in range(0, container.count()):
            specialRules.append(sanitize(container.item(i).text()))

        
        equipementObject["specialRules"] = specialRules

        equipementObject["isExtra"] = 'yes' if self.isExtraCheckBox.isChecked()  else 'no'

        equipementObject["description"] = sanitizeText(self.descriptionPlainTextEdit.toPlainText())

        valid = True
        if(equipementObject['name'] == ''):
            valid = False

        infoDialog = QDialog()
        infoDialog.setLayout(QVBoxLayout(infoDialog))
        infoDialog.setModal(True)
        infoDialog.setWindowFlags(QtCore.Qt.FramelessWindowHint);
        infoDialog.label = QLabel(infoDialog)
        infoDialog.layout().addWidget(infoDialog.label)
        if(valid):
            addEquipementToFiles(equipementObject)
            infoDialog.label.setText("Successfully added equipement to files!")
            infoDialog.show()
            loop = QtCore.QEventLoop()
            QtCore.QTimer.singleShot(2000, loop.quit)
            loop.exec_()
            infoDialog.close()
            self.accept()
        else:
            infoDialog.label.setText("Check your inputs something is wrong...")
            infoDialog.show()
            loop = QtCore.QEventLoop()
            QtCore.QTimer.singleShot(2000, loop.quit)
            loop.exec_()
            infoDialog.close()

    def confirmQuit(self):
        buttonReply = QtWidgets.QMessageBox.warning(
            self, 'Confirm quit', "Are you sure you want to quit?\nThis entry won't be saved.", QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No, QtWidgets.QMessageBox.No)
        if buttonReply == QtWidgets.QMessageBox.Yes:
            self.reject()

    def __init__(self):
        QtWidgets.QDialog.__init__(self)
        Ui_EquipementForm.__init__(self)
        self.setupUi(self)
        self.fillSpecialRulesComboBox()
        self.hintName.hide()


class UnitForm(QtWidgets.QDialog, Ui_UnitForm):

    def checkNameNotExists(self):
        name = sanitize(self.nameInput.text())
        if(name in unitsList):
            self.hintName.show()
        else:
            self.hintName.hide()

    def createSpecialRule(self):
        self.anotherwindow = SpecialRuleForm()
        self.anotherwindow.setModal(True)
        self.anotherwindow.setWindowTitle("New Special Rule")
        result = self.anotherwindow.exec_()
        if(result == 1):
            newSpecialRule = sanitize(self.anotherwindow.nameInput.text())
            self.specialRulesComboBox.addItem(prettify(newSpecialRule))

    def createEquipement(self):
        self.anotherwindow = EquipementForm()
        self.anotherwindow.setModal(True)
        self.anotherwindow.setWindowTitle("New Equipement")
        result = self.anotherwindow.exec_()
        if(result == 1):
            newEquipement = sanitize(self.anotherwindow.nameInput.text())
            self.wargearComboBox.addItem(prettify(newEquipement))

    def createMagicalPower(self):
        self.anotherwindow = MagicalPowerForm()
        self.anotherwindow.setModal(True)
        self.anotherwindow.setWindowTitle("New Magical Power")
        result = self.anotherwindow.exec_()
        if(result == 1):
            newMagicalPower = sanitize(self.anotherwindow.nameInput.text())
            self.magicalPowerComboBox.addItem(prettify(newMagicalPower))

    def addSpecialRule(self):
        newSpecialRule = self.specialRulesComboBox.currentText()
        if(self.specialRuleslistWidget.findItems(newSpecialRule, QtCore.Qt.MatchFixedString) == []):
            self.specialRuleslistWidget.insertItem(0, newSpecialRule)

    def removeSpecialRule(self):
        container = self.specialRuleslistWidget
        container.takeItem(container.row(container.currentItem()))

    def addEquipement(self):
        newEquipement = self.equipementCostSpinBox.cleanText()+' Points \t'+self.wargearComboBox.currentText()
        self.equipementCostSpinBox.setValue(0)
        self.equipementCostSpinBox.repaint()
        if(self.wargearListWidget.findItems(newEquipement, QtCore.Qt.MatchFixedString) == []):
            self.wargearListWidget.insertItem(0, newEquipement)

    def removeEquipement(self):
        container = self.wargearListWidget
        container.takeItem(container.row(container.currentItem()))

    def addKeyword(self):
        newKeyword = self.keywordsComboBox.currentText()
        if(self.keywordListWidget.findItems(newKeyword, QtCore.Qt.MatchFixedString) == []):
            self.keywordListWidget.insertItem(0, newKeyword)
            if(sanitize(newKeyword) in keywordsRanks and sanitize(newKeyword) != 'warrior'):
                self.heroicActionlabel.setEnabled(True)
                self.heroicActionListWidget.setEnabled(True)
                self.heroicActionComboBox.setEnabled(True)
                self.addHeroicActionButton.setEnabled(True)
                self.removeHeroicActionButton.setEnabled(True)
                self.heroicActionlabel.repaint()
                self.heroicActionListWidget.repaint()
                self.heroicActionComboBox.repaint()
                self.addHeroicActionButton.repaint()
                self.removeHeroicActionButton.repaint()
                self.magicalPowersLabel.setEnabled(True)
                self.magicalPowerListWidget.setEnabled(True)
                self.magicalPowerComboBox.setEnabled(True)
                self.addMagicalPowerButton.setEnabled(True)
                self.removeMagicalPowerButton.setEnabled(True)
                self.createMagicalPowerButton.setEnabled(True)
                self.magicalPowersLabel.repaint()
                self.magicalPowerListWidget.repaint()
                self.magicalPowerComboBox.repaint()
                self.addMagicalPowerButton.repaint()
                self.removeMagicalPowerButton.repaint()
                self.createMagicalPowerButton.repaint()

    def removeKeyword(self):
        container = self.keywordListWidget
        currentItem = container.currentItem()
        container.takeItem(container.row(currentItem))
        if(sanitize(currentItem.text()) in keywordsRanks and sanitize(currentItem.text()) != 'warrior'):
            self.heroicActionlabel.setEnabled(False)
            self.heroicActionListWidget.setEnabled(False)
            self.heroicActionComboBox.setEnabled(False)
            self.addHeroicActionButton.setEnabled(False)
            self.removeHeroicActionButton.setEnabled(False)
            self.heroicActionlabel.repaint()
            self.heroicActionListWidget.repaint()
            self.heroicActionComboBox.repaint()
            self.addHeroicActionButton.repaint()
            self.removeHeroicActionButton.repaint()
            self.magicalPowersLabel.setEnabled(False)
            self.magicalPowerListWidget.setEnabled(False)
            self.magicalPowerComboBox.setEnabled(False)
            self.addMagicalPowerButton.setEnabled(False)
            self.removeMagicalPowerButton.setEnabled(False)
            self.createMagicalPowerButton.setEnabled(False)
            self.magicalPowersLabel.repaint()
            self.magicalPowerListWidget.repaint()
            self.magicalPowerComboBox.repaint()
            self.addMagicalPowerButton.repaint()
            self.removeMagicalPowerButton.repaint()
            self.createMagicalPowerButton.repaint()
            

    def addHeroicAction(self):
        newHeroicAction = self.heroicActionComboBox.currentText()
        if(self.heroicActionListWidget.findItems(newHeroicAction, QtCore.Qt.MatchFixedString) == []):
            self.heroicActionListWidget.insertItem(0, newHeroicAction)

    def removeHeroicAction(self):
        container = self.heroicActionListWidget
        container.takeItem(container.row(container.currentItem()))

    def addMagicalPower(self):
        newMagicalPower = self.magicalPowerComboBox.currentText()
        if(self.magicalPowerListWidget.findItems(newMagicalPower, QtCore.Qt.MatchFixedString) == []):
            self.magicalPowerListWidget.insertItem(0, newMagicalPower)

    def removeMagicalPower(self):
        container = self.magicalPowerListWidget
        container.takeItem(container.row(container.currentItem()))

    def fillMagicalPowerComboBox(self):
        self.magicalPowerComboBox.addItem("Magical Powers")
        self.magicalPowerComboBox.model().item(0).setEnabled(False)
        self.magicalPowerComboBox.addItems(prettifyList(magicalPowersList))
        self.magicalPowerComboBox.setCurrentIndex(1)

    def fillHeroicActionComboBox(self):
        self.heroicActionComboBox.addItem("Heroic Actions")
        self.heroicActionComboBox.model().item(0).setEnabled(False)
        self.heroicActionComboBox.addItems(prettifyList(heroicActionsList))
        self.heroicActionComboBox.setCurrentIndex(1)

    def fillSpecialRulesComboBox(self):
        self.specialRulesComboBox.addItem("Special Rules")
        self.specialRulesComboBox.model().item(0).setEnabled(False)
        self.specialRulesComboBox.addItems(prettifyList(specialRulesList))
        self.specialRulesComboBox.setCurrentIndex(1)

    def fillWargearComboBox(self):
        self.wargearComboBox.addItem("Wargear")
        self.wargearComboBox.model().item(0).setEnabled(False)
        self.wargearComboBox.addItems(prettifyList(wargearList))
        self.wargearComboBox.setCurrentIndex(1)

    def fillKeywordsComboBox(self):
        self.keywordsComboBox.addItem("Ranks")
        self.keywordsComboBox.addItems(prettifyList(keywordsRanks))
        self.keywordsComboBox.addItem("Unit Type")
        self.keywordsComboBox.addItems(prettifyList(keywordsTypes))
        self.keywordsComboBox.addItem("Races")
        self.keywordsComboBox.addItems(prettifyList(keywordsRaces))
        self.keywordsComboBox.addItem("Forces")
        self.keywordsComboBox.addItems(prettifyList(keywordsForces))

        self.keywordsComboBox.model().item(0).setEnabled(False)
        self.keywordsComboBox.model().item(1+len(keywordsRanks)).setEnabled(False)
        self.keywordsComboBox.model().item(
            2+len(keywordsRanks)+len(keywordsTypes)).setEnabled(False)
        self.keywordsComboBox.model().item(3+len(keywordsRanks)+len(keywordsTypes) +
                                           len(keywordsRaces)).setEnabled(False)

        self.keywordsComboBox.setCurrentIndex(1)

    def checkFormAndSave(self):
        unitObject = {}
        unitObject["name"] = sanitize(self.nameInput.text())
        unitObject["faction"] = sanitize(self.factionComboBox.currentText())
        unitObject["points"] = self.pointsSpinBox.cleanText()
        keywords = []
        container = self.keywordListWidget
        for i in range(0, container.count()):
            keywords.append(sanitize(container.item(i).text()))

        heroicActions = []
        magicalPowers = []  
        if('warrior' not in keywords):
            container = self.heroicActionListWidget
            for i in range(0, container.count()):
                heroicActions.append(sanitize(container.item(i).text()))
            container = self.magicalPowerListWidget
            for i in range(0, container.count()):
                magicalPowers.append(sanitize(container.item(i).text()))

        specialRules = []
        container = self.specialRuleslistWidget
        for i in range(0, container.count()):
            specialRules.append(sanitize(container.item(i).text()))

        wargear = []
        container = self.wargearListWidget
        for i in range(0, container.count()):
            points,equipement = container.item(i).text().split(' Points \t')
            wargear.append((sanitize(equipement),points))

        unitObject["keywords"] = keywords
        unitObject["specialRules"] = specialRules
        unitObject["wargear"] = wargear
        unitObject["heroicActions"] = heroicActions
        unitObject["magicalPowers"] = magicalPowers

        # characteristics
        unitObject["move"] = self.moveInput.text()
        unitObject["fight"] = self.fightInput.text()
        unitObject["shoot"] = self.shootInput.text()
        unitObject["strength"] = self.strengthInput.text()
        unitObject["defence"] = self.defenceInput.text()
        unitObject["attacks"] = self.attacksInput.text()
        unitObject["wounds"] = self.woundsInput.text()
        unitObject["courage"] = self.courageInput.text()
        unitObject["might"] = self.mightInput.text()
        unitObject["will"] = self.willInput.text()
        unitObject["faith"] = self.faithInput.text()

        unitObject["description"] = sanitizeText(self.descriptionPlainTextEdit.toPlainText())

        valid = True
        for (key, value) in unitObject.items():
            if(key in ['keywords', 'wargear'] and value == []):
                valid = False
            elif(key == 'points' and value == '0'):
                valid = False
            elif(key not in ['description', 'specialRules','heroicActions','magicalPowers'] and value == ''):
                valid = False
            elif(key in ['move', 'fight','shoot','strength','defence','attacks','wounds','courage','might','will','faith']):
                try: 
                    int(value)
                except ValueError:
                    valid = False

        infoDialog = QDialog()
        infoDialog.setLayout(QVBoxLayout(infoDialog))
        infoDialog.setModal(True)
        infoDialog.setWindowFlags(QtCore.Qt.FramelessWindowHint);
        infoDialog.label = QLabel(infoDialog)
        infoDialog.layout().addWidget(infoDialog.label)
        if(valid):
            addUnitToFiles(unitObject)
            infoDialog.label.setText("Successfully added unit to files!")
            infoDialog.show()
            loop = QtCore.QEventLoop()
            QtCore.QTimer.singleShot(2000, loop.quit)
            loop.exec_()
            infoDialog.close()
            self.accept()
        else:
            infoDialog.label.setText("Check your inputs something is wrong...")
            infoDialog.show()
            loop = QtCore.QEventLoop()
            QtCore.QTimer.singleShot(2000, loop.quit)
            loop.exec_()
            infoDialog.close()

    def confirmQuit(self):
        buttonReply = QtWidgets.QMessageBox.warning(
            self, 'Confirm quit', "Are you sure you want to quit?\nThis entry won't be saved.", QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No, QtWidgets.QMessageBox.No)
        if buttonReply == QtWidgets.QMessageBox.Yes:
            self.reject()

    def __init__(self):
        QtWidgets.QDialog.__init__(self)
        Ui_UnitForm.__init__(self)
        self.setupUi(self)
        self.fillKeywordsComboBox()
        self.fillWargearComboBox()
        self.fillSpecialRulesComboBox()
        self.fillHeroicActionComboBox()
        self.fillMagicalPowerComboBox()
        self.hintName.hide()
        
        self.heroicActionlabel.setEnabled(False)
        self.heroicActionListWidget.setEnabled(False)
        self.heroicActionComboBox.setEnabled(False)
        self.addHeroicActionButton.setEnabled(False)
        self.removeHeroicActionButton.setEnabled(False)

        self.magicalPowersLabel.setEnabled(False)
        self.magicalPowerListWidget.setEnabled(False)
        self.magicalPowerComboBox.setEnabled(False)
        self.addMagicalPowerButton.setEnabled(False)
        self.removeMagicalPowerButton.setEnabled(False)
        self.createMagicalPowerButton.setEnabled(False)
        self.repaint()
        


if __name__ == "__main__":
    app = 0  # if not the core will die
    app = QtWidgets.QApplication(sys.argv)
    app.setApplicationName("LotrDatabaseHelper")
    app.setWindowIcon(QtGui.QIcon(resource_path('ressources/favicon.ico')))
    window = WelcomeWindow()
    window.setWindowTitle("Lotr Database Helper")
    window.show()
    sys.exit(app.exec_())
