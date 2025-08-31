package com.wipro.paymentms.dto;

public class PaymentResponseEvent {
    private Long bookingId;
    private String status;

    public PaymentResponseEvent() {}

    public PaymentResponseEvent(Long bookingId, String status) {
        this.bookingId = bookingId;
        this.status = status;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
