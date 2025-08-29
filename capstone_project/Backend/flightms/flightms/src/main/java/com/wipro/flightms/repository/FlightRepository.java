package com.wipro.flightms.repository;

import com.wipro.flightms.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    @Query("SELECT f FROM Flight f " +
            "WHERE f.source.airportCode = :source " +
            "AND f.destination.airportCode = :destination " +
            "AND DATE(f.startDate) = :date")
    List<Flight> findFlights(String source, String destination, LocalDate date);
}
