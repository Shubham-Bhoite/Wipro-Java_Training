package com.wipro.flightms.dto.response;



import java.time.LocalDate;

public class FlightResponse {
    private Long flightId;
    private String flightName;
    private String flightNumber;
    private String airline;
    private String source;
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double price;
    private String time;
	public FlightResponse(Long flightId2, String flightName2, String flightNumber2, String airline2, String airportCode,
			String airportCode2, LocalDate startDate2, LocalDate endDate2, Double price2, String time2) {
		// TODO Auto-generated constructor stub
	}
	public Long getFlightId() {
		return flightId;
	}
	public void setFlightId(Long flightId) {
		this.flightId = flightId;
	}
	public String getFlightName() {
		return flightName;
	}
	public void setFlightName(String flightName) {
		this.flightName = flightName;
	}
	public String getFlightNumber() {
		return flightNumber;
	}
	public void setFlightNumber(String flightNumber) {
		this.flightNumber = flightNumber;
	}
	public String getAirline() {
		return airline;
	}
	public void setAirline(String airline) {
		this.airline = airline;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
    
    
}
