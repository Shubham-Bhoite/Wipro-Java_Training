package com.wipro.bookingms.dto.request;


public class PaymentEvent {

    private Long bookingId;
    private Double amount;
    private String paymentMode;
    private String cardNumber;
    private String expiry;
    private String cvv;

    public PaymentEvent() {
    }

    public PaymentEvent(Long bookingId, Double amount, String paymentMode,
                        String cardNumber, String expiry, String cvv) {
        this.bookingId = bookingId;
        this.amount = amount;
        this.paymentMode = paymentMode;
        this.cardNumber = cardNumber;
        this.expiry = expiry;
        this.cvv = cvv;
    }

    
    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiry() {
        return expiry;
    }

    public void setExpiry(String expiry) {
        this.expiry = expiry;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }
}

