When(/^the client requests orders for the patient "(.*?)" in FHIR format$/) do |pid|
  temp = QueryRDKAll.new("Order")
  temp.add_parameter("subject.identifier", pid)
  #temp.add_parameter("domain", "imun")
  temp.add_acknowledge("true")
  p temp.path
  @response = HTTPartyWithBasicAuth.get_with_authorization(temp.path)
end

When(/^the client requests orders for that sensitive patient "(.*?)"$/) do |pid|
  temp = QueryRDKAll.new("Order")
  temp.add_parameter("subject.identifier", pid)
  #temp.add_parameter("domain", "imun")
  temp.add_acknowledge("false")
  p temp.path
  @response = HTTPartyWithBasicAuth.get_with_authorization(temp.path)
end

When(/^the client breaks glass and repeats a request for orders for that patient "(.*?)"$/) do |pid|
  temp = QueryRDKAll.new("Order")
  temp.add_parameter("subject.identifier", pid)
  #temp.add_parameter("domain", "imun")
  temp.add_acknowledge("true")
  p temp.path
  @response = HTTPartyWithBasicAuth.get_with_authorization(temp.path)
end

When(/^the client requests "(.*?)" orders for the patient "(.*?)" in FHIR format$/) do |limit, pid|
  temp = QueryRDKAll.new("Order")
  temp.add_parameter("subject.identifier", pid)
  temp.add_parameter("limit", limit)
  temp.add_acknowledge("true")
  p temp.path
  @response = HTTPartyWithBasicAuth.get_with_authorization(temp.path)
end
