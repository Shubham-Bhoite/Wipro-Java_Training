package com.wipro.flightms.entity;

import jakarta.persistence.*;


@Entity
@Table(name="airport")

public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airportId;
    private String airportName;
    private String airportCode;
    private String address;
    
    public Airport() {
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
	public Airport(  String airportName, String airportCode, String address) {
		
		this.airportName = airportName;
		this.airportCode = airportCode;
		this.address = address;
	}
    
    
	
}
