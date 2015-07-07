path = File.expand_path '../helper', __FILE__
$LOAD_PATH.unshift path unless $LOAD_PATH.include?(path)

require 'AccessBrowserV2.rb'

class Ehmpui < ADKContainer
  include Singleton
  def initialize
    super
    add_verify(CucumberLabel.new("Lab Results Applet Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, "[data-appletid=lab_results_grid] .panel-title"))
    #add_verify(CucumberLabel.new("Allergies Applet Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, "#content-region span.pull-left.panel-title"))
    add_verify(CucumberLabel.new("Problems Applet Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, "#content-region span.pull-left.panel-title"))
    add_verify(CucumberLabel.new("Lab Order Panel Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, "#content-region h3.panel-title"))
    add_verify(CucumberLabel.new("Allergies Panel Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, "content-region"))
    add_verify(CucumberLabel.new("Progress Notes Panel Title"), VerifyContainsText.new, AccessHtmlElement.new(:id, "progress-notes-header"))
    add_verify(CucumberLabel.new("Panel Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, "#applet-header-region h3.panel-title"))
    #add_verify(CucumberLabel.new("Panel Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, "#applet-header-region h3.panel-title"))
    #add_verify(CucumberLabel.new("Panel Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, ".panel-heading"))
    add_verify(CucumberLabel.new("Panel Heading"), VerifyContainsText.new, AccessHtmlElement.new(:css, "#applet-header-region div.panel-heading"))
    add_action(CucumberLabel.new("Search Field"), SendKeysAction.new, AccessHtmlElement.new(:id, "patientSearchInput"))
    @@count_action = AccessHtmlElement.new(:css, "#patient-search-results a")
    add_verify(CucumberLabel.new("Patient List Length"), VerifyXpathCount.new(@@count_action), @@count_action)
    add_action(CucumberLabel.new("Search Field"), SendKeysAction.new, AccessHtmlElement.new(:id, "patientSearchInput"))
    add_action(CucumberLabel.new("Sample Applets"), ClickAction.new, AccessHtmlElement.new(:link_text, "Sample Applets"))
    add_action(CucumberLabel.new("Sample Layouts"), ClickAction.new, AccessHtmlElement.new(:link_text, "Sample Layouts"))
    add_action(CucumberLabel.new("Open Menu"), ClickAction.new, AccessHtmlElement.new(:css, "li.open"))
    add_action(CucumberLabel.new("Medications"), ClickAction.new, AccessHtmlElement.new(:link_text, "Medications"))
    add_action(CucumberLabel.new("Problem History"), ClickAction.new, AccessHtmlElement.new(:link_text, "Problem History"))
    add_action(CucumberLabel.new("Allergies"), ClickAction.new, AccessHtmlElement.new(:link_text, "Allergies"))
    add_action(CucumberLabel.new("Vitals"), ClickAction.new, AccessHtmlElement.new(:link_text, "Vitals"))
    #add_verify(CucumberLabel.new("Labs"), VerifyContainsText.new, AccessHtmlElement.new(:class, "Labs"))
    #add_action(CucumberLabel.new("Labs"), ClickAction.new, AccessHtmlElement.new(:class, "Labs"))
    add_action(CucumberLabel.new("Grid 2"), ClickAction.new, AccessHtmlElement.new(:link_text, "Grid 2"))
    add_action(CucumberLabel.new("Grid 3"), ClickAction.new, AccessHtmlElement.new(:link_text, "Grid 3"))
    add_action(CucumberLabel.new("Grid 4"), ClickAction.new, AccessHtmlElement.new(:link_text, "Grid 4"))
    add_action(CucumberLabel.new("Grid 9"), ClickAction.new, AccessHtmlElement.new(:link_text, "Grid 9"))
    add_verify(CucumberLabel.new("Applet Title"), VerifyText.new, AccessHtmlElement.new(:css, "#center #applet-main h3.panel-title"))
    add_verify(CucumberLabel.new("Center Applet Title"), VerifyText.new, AccessHtmlElement.new(:css, "#center-region #applet-main h3.panel-title"))
   # add_verify(CucumberLabel.new("Left Applet Title"), VerifyText.new, AccessHtmlElement.new(:css, "#left #applet-main h3.panel-title"))
    #add_verify(CucumberLabel.new("Left Applet Title"), VerifyText.new, AccessHtmlElement.new(:css, ".pull-left.panel-title"))
    add_verify(CucumberLabel.new("Left Applet Title"), VerifyText.new, AccessHtmlElement.new(:id, "right"))
    add_verify(CucumberLabel.new("Right Applet Title"), VerifyText.new, AccessHtmlElement.new(:css, "#right #applet-main h3.panel-title"))
    add_verify(CucumberLabel.new("Bottom Applet Title"), VerifyText.new, AccessHtmlElement.new(:css, "#bottom-region #applet-main h3.panel-title"))
    add_verify(CucumberLabel.new("TopLeft Applet Title"), VerifyText.new, AccessHtmlElement.new(:css, "#topLeft #applet-main h3.panel-title"))
    add_verify(CucumberLabel.new("TopRight Applet Title"), VerifyText.new, AccessHtmlElement.new(:css, "#topRight #applet-main h3.panel-title"))
    #add_verify(CucumberLabel.new("Applet Title"), VerifyText.new, AccessHtmlElement.new(:css, ".panel-title"))
    #add_verify(CucumberLabel.new("Applet Title"), VerifyText.new, AccessHtmlElement.new(:xpath, ".//*[@id='applet-main']/div/div[1]/h3"))
    #add_verify(CucumberLabel.new("Modal Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, "#modal-region h4.col-sm-4.modal-title"))
    add_verify(CucumberLabel.new("Modal Title"), VerifyContainsText.new, AccessHtmlElement.new(:id, "mainModalLabel"))
    add_verify(CucumberLabel.new("Medication Review"), VerifyContainsText.new, AccessHtmlElement.new(:link_text, "Medication Review"))
    add_verify(CucumberLabel.new("Coversheet"), VerifyContainsText.new, AccessHtmlElement.new(:id, "cover-sheet-button"))
    add_verify(CucumberLabel.new("All Patient"), VerifyContainsText.new, AccessHtmlElement.new(:id, "global"))
    add_verify(CucumberLabel.new("My CPRS List"), VerifyContainsText.new, AccessHtmlElement.new(:id, "myCPRSList"))
    add_action(CucumberLabel.new("Table Filter"), ClickAction.new, AccessHtmlElement.new(:id, "grid-filter-button-lab_results_grid"))
    add_action(CucumberLabel.new("Search Input"), SendKeysAction.new, AccessHtmlElement.new(:css, ".grid-filter"))
    #add_action(CucumberLabel.new("Expand View"), ClickAction.new, AccessHtmlElement.new(:css, "#right .grid-resize #applet-expand"))
    add_action(CucumberLabel.new("Expand View"), ClickAction.new, AccessHtmlElement.new(:css, ".applet-maximize-button"))
    add_action(CucumberLabel.new("Minimize View"), ClickAction.new, AccessHtmlElement.new(:css, ".applet-minimize-button"))
   # add_action(CucumberLabel.new("Modal Popup View"), ClickAction.new, AccessHtmlElement.new(:id, "urn-va-allergy-C877-3-874"))
   # add_action(CucumberLabel.new("Modal Popup View"), ClickAction.new, AccessHtmlElement.new(:css, "urn-va-allergy-C877-3-874 class.string-cell.sortable.renderable"))
    add_action(CucumberLabel.new("Modal Popup View"), ClickAction.new, AccessHtmlElement.new(:xpath, "//table/tbody/tr[2]/td[2]"))#=urn-va-problem-DOD-0000000010-1000001442
    #add_action(CucumberLabel.new("Modal Popup View"), ClickAction.new, AccessHtmlElement.new(:xpath, "//*[@id='urn-va-problem-DOD-0000000010-1000001442']/td[1]"))
    add_action(CucumberLabel.new("Progress Notes Details..."), ClickAction.new, AccessHtmlElement.new(:id, "progress-notes-show-details"))
    add_action(CucumberLabel.new("Progress Notes Close"), ClickAction.new, AccessHtmlElement.new(:id, "progress-notes-close-button"))
    add_action(CucumberLabel.new("Progress Notes X Close"), ClickAction.new, AccessHtmlElement.new(:id, "progress-notes-x-button"))
    add_action(CucumberLabel.new("Lab Orders Row Click"), ClickAction.new, AccessHtmlElement.new(:css, "td"))
    add_action(CucumberLabel.new("Lab Orders Close"), ClickAction.new, AccessHtmlElement.new(:id, "lab-orders-close-button"))
    add_action(CucumberLabel.new("Lab Orders X Close"), ClickAction.new, AccessHtmlElement.new(:id, "lab-orders-x-button"))
    add_verify(CucumberLabel.new("Page Title"), VerifyContainsText.new, AccessHtmlElement.new(:css, ".panel-heading"))
    add_verify(CucumberLabel.new("Search Modal"), VerifyContainsText.new, AccessHtmlElement.new(:id, "mainModalLabel")) 

    
   
  end

  def count_action
    return @@count_action
  end
  
  def select_patient_in_list(index)
    driver = TestSupport.driver

    how = count_action.how
    location = count_action.locator
    patientlist = driver.find_elements(how, location)
    p patientlist.length
    patientlist[index.to_i].click
  end
end # ehmpui

Given(/^user views eHMP\-UI$/) do
  p DefaultLogin.ehmpui_url
  TestSupport.navigate_to_url(DefaultLogin.ehmpui_url)
  TestSupport.driver.manage.window.maximize
  con = Ehmpui.instance
end

Then(/^"(.*?)" contains patient name "(.*?)"$/) do |location, expected_text|
  con = Ehmpui.instance
  expect(con.perform_verification(location, expected_text)).to be_true
end

Then(/^"(.*?)" contains "(.*?)"$/) do |location, expected_text|
  con = Ehmpui.instance
  expect(con.perform_verification(location, expected_text)).to be_true
end

def wait_until_dom_has_confirmflag_or_patientsearch
  patient_search = PatientSearch2.instance
  wait_until = 60
  has_refreshed = false
  wait_until = DefaultLogin.wait_time # / 2
  completed = false
  counter = 0
  loop do
    counter = counter+1
    if patient_search.static_dom_element_exists?("patientSearch")
      completed = true
      break
    end
    if patient_search.static_dom_element_exists?("Confirm Flag")
      expect(patient_search.perform_action("Confirm Flag")).to be_true
    end
    sleep 1
    break if counter > wait_until
  end #loop
  return completed
end

Given(/^user searches for and selects "(.*?)"$/) do |search_value|
  patient_search = PatientSearch.instance
  
  # if patient search button is found, click it to go to patient search
  patient_search.perform_action("patientSearch") if patient_search.static_dom_element_exists? "patientSearch"

  patient_search.wait_until_element_present("mySite", DefaultLogin.wait_time)
  
  expect(patient_search.perform_action("mySite")).to be_true

  patient_search.wait_until_element_present("mySiteAll", DefaultLogin.wait_time)
  expect(patient_search.perform_action("mySiteAll")).to be_true
  expect(patient_search.perform_action("patientSearchInput", search_value)).to be_true

  expect(patient_search.wait_until_xpath_count_greater_than("Patient Search Results", 0)).to be_true

  results = TestSupport.driver.find_elements(:xpath, "//span[contains(@class, 'patientDisplayName')]")

  patient_search.select_patient_in_list(0)
  patient_search.wait_until_element_present("Confirm", DefaultLogin.wait_time)
  expect(patient_search.static_dom_element_exists? "Confirm").to be_true

  results = TestSupport.driver.find_element(:css, "#patient-search-confirmation div.patientName")
  expect(patient_search.perform_action("Confirm")).to be_true

  # deliberate use of wait time other then the DefaultLogin.wait_time
  #expect(patient_search.wait_until_element_present("patientSearch", 60)).to be_true
  expect(wait_until_dom_has_confirmflag_or_patientsearch).to be_true, "Patient selection did not complete successfully"
end

Then(/^the search results display (\d+) results$/) do |expected_num|
  con = Ehmpui.instance
  num_seconds = 5
  con.wait_until_xpath_count("Patient List Length", expected_num, num_seconds)
  expect(con.perform_verification("Patient List Length", expected_num)).to be_true
end

Given(/^user selects patient (\d+) in the list$/) do |index|

  
  con = Ehmpui.instance
  con.select_patient_in_list(index)
  
end

When(/^the user selects "(.*?)" menu header$/) do |menu_header_text|
  con = Ehmpui.instance
  con.wait_until_element_present(menu_header_text)
  expect(con.perform_action(menu_header_text)).to be_true
  con.wait_until_action_element_visible("Open Menu")
end

When(/^the user selects "(.*?)" menu item$/) do |menu_item|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible(menu_item)
  expect(aa.perform_action(menu_item)).to be_true
end

Then(/^the panel title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  #aa.wait_until_action_element_visible("Applet Title", 60)
  
  wait_until = DefaultLogin.wait_time
  counter = 0
  loop do
    counter = counter+1
    break if aa.perform_verification("Applet Title", arg1)
    #sleep 1
    p "counter #{counter}"
    break if counter > wait_until
  end #loop
  expect(aa.perform_verification("Applet Title", arg1)).to be_true
end

Then(/^the center panel title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Center Applet Title")
  expect(aa.perform_verification("Center Applet Title", arg1)).to be_true
end

Then(/^the left panel title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Left Applet Title")
  expect(aa.perform_verification("Left Applet Title", arg1)).to be_true
  #sleep 15
end

Then(/^the right panel title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Right Applet Title")
  expect(aa.perform_verification("Right Applet Title", arg1)).to be_true
  #sleep 15
end

Then(/^the topLeft panel title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("TopLeft Applet Title")
  expect(aa.perform_verification("TopLeft Applet Title", arg1)).to be_true
  #sleep 15
end

Then(/^the topRight panel title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("TopRight Applet Title")
  expect(aa.perform_verification("TopRight Applet Title", arg1)).to be_true
  #sleep 15
end

Then(/^the bottom panel title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Bottom Applet Title")
  expect(aa.perform_verification("Bottom Applet Title", arg1)).to be_true
end

Then(/^the lab order panel title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Applet Title")
  expect(aa.perform_verification("Applet Title", arg1)).to be_true
end

Then(/^the progress notes panel title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Applet Title")
  expect(aa.perform_verification("Applet Title", arg1)).to be_true
end

Then(/^the lab results applet title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Lab Results Applet Title")
  expect(aa.perform_verification("Lab Results Applet Title", arg1)).to be_true
end

Then(/^the problems applet title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Problems Applet Title")
  expect(aa.perform_verification("Problems Applet Title", arg1)).to be_true
end

Then(/^the allergies applet title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Allergies Applet Title")
  expect(aa.perform_verification("Allergies Applet Title", arg1)).to be_true
end

Then(/^the modal title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  #aa.wait_until_element_present("Modal Title", 60)
  aa.wait_until_action_element_visible("Modal Title")
  expect(aa.perform_verification("Modal Title", arg1)).to be_true
end

Then(/^the tab is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Medication Review")
  expect(aa.perform_verification("Medication Review", arg1)).to be_true
end

Then(/^the user is on tab "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("Coversheet")
  expect(aa.perform_verification("Coversheet", arg1)).to be_true
end

Then(/^the user is on all patient tab "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("All Patient")
  expect(aa.perform_verification("All Patient", arg1)).to be_true
end

Then(/^the user is on myCPRSList tab "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  aa.wait_until_action_element_visible("My CPRS List")
  expect(aa.perform_verification("My CPRS List", arg1)).to be_true
end

When(/^the user clicks on "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  #sleep 3
  aa.wait_until_action_element_visible("Table Filter")
  expect(aa.perform_action(arg1)).to be_true
end

Then(/^the user views "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  #aa.wait_until_action_element_visible("Search Input", 60)
  expect(aa.perform_action(arg1)).to be_true
end

#When(/^the user clicks "([^"]*)"$/) do |element|
#  aa = Ehmpui.instance
#  driver = TestSupport.driver
#  expect(aa.static_dom_element_exists?(element)).to be_true
#  expect(aa.perform_action(element, "")).to be_true
#end

Then(/^the search modal title is "(.*?)"$/) do |arg1|
  aa = Ehmpui.instance
  #aa.wait_until_element_present("Modal Title", 60)
  aa.wait_until_action_element_visible("Search Modal")
  expect(aa.perform_verification("Search Modal", arg1)).to be_true
end
