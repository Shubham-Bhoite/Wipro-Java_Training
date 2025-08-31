package com.wipro.flightms.dto.response;

public class AirlineResponse {
    private Long airportId;
    private String airportName;
    private String airportCode;
    private String address;

    public AirlineResponse(Long airportId, String airportName, String airportCode, String address) {
        this.airportId = airportId;
        this.airportName = airportName;
        this.airportCode = airportCode;
        this.address = address;
    }
    
    
	public Long getAirportId() {
		return airportId;
	}
	public void setAirportId(Long airportId) {
		this.airportId = airportId;
	}
	public String getAirportName() {
		return airportName;
	}
	public void setAirportName(String airportName) {
		this.airportName = airportName;
	}
	public String getAirportCode() {
		return airportCode;
	}
	public void setAirportCode(String airportCode) {
		this.airportCode = airportCode;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
    
    
}
