package com.wipro.bookingms.dto.response;



public class BookingResponse {
    private Long bookingId;
    private Long flightId;
    private String passengerName;
    private String passengerEmail;
    private String status;
    private FlightResponse flightDetails; 
    
    public BookingResponse() {}
    
	public Long getBookingId() {
		return bookingId;
	}
	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}
	public Long getFlightId() {
		return flightId;
	}
	public void setFlightId(Long flightId) {
		this.flightId = flightId;
	}
	public String getPassengerName() {
		return passengerName;
	}
	public void setPassengerName(String passengerName) {
		this.passengerName = passengerName;
	}
	public String getPassengerEmail() {
		return passengerEmail;
	}
	public void setPassengerEmail(String passengerEmail) {
		this.passengerEmail = passengerEmail;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public FlightResponse getFlightDetails() {
		return flightDetails;
	}
	public void setFlightDetails(FlightResponse flightDetails) {
		this.flightDetails = flightDetails;
	}
	
    
    
}
