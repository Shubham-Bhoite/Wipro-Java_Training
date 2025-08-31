package com.wipro.flightms.config;

import com.wipro.flightms.entity.Airport;
import com.wipro.flightms.entity.Flight;
import com.wipro.flightms.repository.AirportRepository;
import com.wipro.flightms.repository.FlightRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;



public class DataInitializer {

    
//    CommandLineRunner initDatabase(AirportRepository airportRepository, FlightRepository flightRepository) {
//        return args -> {
//            // Insert Airports
//            Airport delhi = airportRepository.save(new Airport("Delhi International", "DEL", "Delhi"));
//            Airport mumbai = airportRepository.save(new Airport("Mumbai Airport", "BOM", "Mumbai"));
//            Airport bangalore = airportRepository.save(new Airport("Bangalore Airport", "BLR", "Bangalore"));
//            Airport hyderabad = airportRepository.save(new Airport("Hyderabad Airport", "HYD", "Hyderabad"));
//            Airport chennai = airportRepository.save(new Airport("Chennai Airport", "MAA", "Chennai"));
//            Airport goa = airportRepository.save(new Airport("Goa Airport", "GOI", "Goa"));
//            Airport pune = airportRepository.save(new Airport("Pune Airport", "PNQ", "Pune"));
//            Airport kolkata = airportRepository.save(new Airport("Kolkata Airport", "CCU", "Kolkata"));
//            Airport newyork = airportRepository.save(new Airport("JFK International", "JFK", "New York"));
//
//            List<Flight> flights = List.of(
//            	    new Flight("Air India 1", "AI101", "Air India", delhi, mumbai, LocalDate.of(2025, 9, 1), LocalDate.of(2025, 9, 1), 5500.0, "10:30"),
//            	    new Flight("IndiGo 2", "6E102", "IndiGo", bangalore, hyderabad, LocalDate.of(2025, 9, 2), LocalDate.of(2025, 9, 2), 3200.0, "08:15"),
//            	    new Flight("Vistara 3", "UK103", "Vistara", chennai, delhi, LocalDate.of(2025, 9, 3), LocalDate.of(2025, 9, 3), 7200.0, "14:00"),
//            	    new Flight("SpiceJet 4", "SG104", "SpiceJet", mumbai, goa, LocalDate.of(2025, 9, 4), LocalDate.of(2025, 9, 4), 2800.0, "06:45"),
//            	    new Flight("AirAsia 5", "I105", "AirAsia", delhi, bangalore, LocalDate.of(2025, 9, 5), LocalDate.of(2025, 9, 5), 4600.0, "11:30"),
//            	    new Flight("GoAir 6", "G106", "GoAir", hyderabad, chennai, LocalDate.of(2025, 9, 6), LocalDate.of(2025, 9, 6), 3100.0, "13:00"),
//            	    new Flight("Vistara 7", "UK107", "Vistara", pune, delhi, LocalDate.of(2025, 9, 7), LocalDate.of(2025, 9, 7), 8800.0, "16:20"),
//            	    new Flight("IndiGo 8", "6E108", "IndiGo", kolkata, mumbai, LocalDate.of(2025, 9, 8), LocalDate.of(2025, 9, 8), 5100.0, "18:10"),
//            	    new Flight("SpiceJet 9", "SG109", "SpiceJet", goa, delhi, LocalDate.of(2025, 9, 9), LocalDate.of(2025, 9, 10), 6000.0, "22:30"),
//            	    new Flight("Air India 10", "AI110", "Air India", delhi, newyork, LocalDate.of(2025, 9, 10), LocalDate.of(2025, 9, 11), 45000.0, "23:55"),
//            	    new Flight("Air India 11", "AI111", "Air India", mumbai, pune, LocalDate.of(2025, 9, 11), LocalDate.of(2025, 9, 11), 5400.0, "07:50"),
//            	    new Flight("IndiGo 12", "6E112", "IndiGo", hyderabad, bangalore, LocalDate.of(2025, 9, 12), LocalDate.of(2025, 9, 12), 3300.0, "09:30"),
//            	    new Flight("Vistara 13", "UK113", "Vistara", delhi, chennai, LocalDate.of(2025, 9, 13), LocalDate.of(2025, 9, 13), 7100.0, "12:15"),
//            	    new Flight("SpiceJet 14", "SG114", "SpiceJet", goa, mumbai, LocalDate.of(2025, 9, 14), LocalDate.of(2025, 9, 14), 2900.0, "15:20"),
//            	    new Flight("AirAsia 15", "I115", "AirAsia", bangalore, delhi, LocalDate.of(2025, 9, 15), LocalDate.of(2025, 9, 15), 4700.0, "10:45"),
//            	    new Flight("GoAir 16", "G116", "GoAir", chennai, hyderabad, LocalDate.of(2025, 9, 16), LocalDate.of(2025, 9, 16), 3200.0, "13:35"),
//            	    new Flight("Vistara 17", "UK117", "Vistara", pune, kolkata, LocalDate.of(2025, 9, 17), LocalDate.of(2025, 9, 17), 8900.0, "17:00"),
//            	    new Flight("IndiGo 18", "6E118", "IndiGo", mumbai, goa, LocalDate.of(2025, 9, 18), LocalDate.of(2025, 9, 18), 5200.0, "19:25"),
//            	    new Flight("SpiceJet 19", "SG119", "SpiceJet", delhi, bangalore, LocalDate.of(2025, 9, 19), LocalDate.of(2025, 9, 19), 6100.0, "21:10"),
//            	    new Flight("Air India 20", "AI120", "Air India", newyork, delhi, LocalDate.of(2025, 9, 20), LocalDate.of(2025, 9, 21), 46000.0, "23:50"),
//            	    new Flight("Air India 21", "AI121", "Air India", delhi, kolkata, LocalDate.of(2025, 9, 21), LocalDate.of(2025, 9, 21), 5600.0, "08:05"),
//            	    new Flight("IndiGo 22", "6E122", "IndiGo", bangalore, pune, LocalDate.of(2025, 9, 22), LocalDate.of(2025, 9, 22), 3400.0, "09:50"),
//            	    new Flight("Vistara 23", "UK123", "Vistara", chennai, mumbai, LocalDate.of(2025, 9, 23), LocalDate.of(2025, 9, 23), 7300.0, "12:20"),
//            	    new Flight("SpiceJet 24", "SG124", "SpiceJet", goa, hyderabad, LocalDate.of(2025, 9, 24), LocalDate.of(2025, 9, 24), 3000.0, "15:45"),
//            	    new Flight("AirAsia 25", "I125", "AirAsia", delhi, chennai, LocalDate.of(2025, 9, 25), LocalDate.of(2025, 9, 25), 4800.0, "11:10"),
//            	    new Flight("GoAir 26", "G126", "GoAir", kolkata, pune, LocalDate.of(2025, 9, 26), LocalDate.of(2025, 9, 26), 3300.0, "13:50"),
//            	    new Flight("Vistara 27", "UK127", "Vistara", pune, bangalore, LocalDate.of(2025, 9, 27), LocalDate.of(2025, 9, 27), 9000.0, "16:40"),
//            	    new Flight("IndiGo 28", "6E128", "IndiGo", mumbai, delhi, LocalDate.of(2025, 9, 28), LocalDate.of(2025, 9, 28), 5300.0, "18:30"),
//            	    new Flight("SpiceJet 29", "SG129", "SpiceJet", goa, kolkata, LocalDate.of(2025, 9, 29), LocalDate.of(2025, 9, 29), 6200.0, "21:15"),
//            	    new Flight("Air India 30", "AI130", "Air India", delhi, hyderabad, LocalDate.of(2025, 9, 30), LocalDate.of(2025, 9, 30), 47000.0, "23:40"),
//            	    new Flight("Air India 31", "AI131", "Air India", bangalore, delhi, LocalDate.of(2025, 10, 1), LocalDate.of(2025, 10, 1), 5700.0, "07:25"),
//            	    new Flight("IndiGo 32", "6E132", "IndiGo", hyderabad, mumbai, LocalDate.of(2025, 10, 2), LocalDate.of(2025, 10, 2), 3500.0, "09:10"),
//            	    new Flight("Vistara 33", "UK133", "Vistara", chennai, goa, LocalDate.of(2025, 10, 3), LocalDate.of(2025, 10, 3), 7400.0, "12:05"),
//            	    new Flight("SpiceJet 34", "SG134", "SpiceJet", kolkata, bangalore, LocalDate.of(2025, 10, 4), LocalDate.of(2025, 10, 4), 3100.0, "15:35"),
//            	    new Flight("AirAsia 35", "I135", "AirAsia", delhi, pune, LocalDate.of(2025, 10, 5), LocalDate.of(2025, 10, 5), 4900.0, "11:20"),
//            	    new Flight("GoAir 36", "G136", "GoAir", mumbai, chennai, LocalDate.of(2025, 10, 6), LocalDate.of(2025, 10, 6), 3400.0, "13:55"),
//            	    new Flight("Vistara 37", "UK137", "Vistara", pune, delhi, LocalDate.of(2025, 10, 7), LocalDate.of(2025, 10, 7), 9100.0, "16:50"),
//            	    new Flight("IndiGo 38", "6E138", "IndiGo", goa, mumbai, LocalDate.of(2025, 10, 8), LocalDate.of(2025, 10, 8), 5400.0, "18:40"),
//            	    new Flight("SpiceJet 39", "SG139", "SpiceJet", delhi, hyderabad, LocalDate.of(2025, 10, 9), LocalDate.of(2025, 10, 9), 6300.0, "21:25"),
//            	    new Flight("Air India 40", "AI140", "Air India", newyork, delhi, LocalDate.of(2025, 10, 10), LocalDate.of(2025, 10, 11), 48000.0, "23:35"),
//            	    new Flight("Air India 41", "AI141", "Air India", delhi, mumbai, LocalDate.of(2025, 10, 11), LocalDate.of(2025, 10, 11), 5800.0, "07:40"),
//            	    new Flight("IndiGo 42", "6E142", "IndiGo", bangalore, hyderabad, LocalDate.of(2025, 10, 12), LocalDate.of(2025, 10, 12), 3600.0, "09:20"),
//            	    new Flight("Vistara 43", "UK143", "Vistara", chennai, delhi, LocalDate.of(2025, 10, 13), LocalDate.of(2025, 10, 13), 7500.0, "12:10"),
//            	    new Flight("SpiceJet 44", "SG144", "SpiceJet", mumbai, goa, LocalDate.of(2025, 10, 14), LocalDate.of(2025, 10, 14), 3200.0, "15:50"),
//            	    new Flight("AirAsia 45", "I145", "AirAsia", delhi, bangalore, LocalDate.of(2025, 10, 15), LocalDate.of(2025, 10, 15), 5000.0, "11:45"),
//            	    new Flight("GoAir 46", "G146", "GoAir", hyderabad, chennai, LocalDate.of(2025, 10, 16), LocalDate.of(2025, 10, 16), 3500.0, "13:25"),
//            	    new Flight("Vistara 47", "UK147", "Vistara", pune, delhi, LocalDate.of(2025, 10, 17), LocalDate.of(2025, 10, 17), 9200.0, "16:55"),
//            	    new Flight("IndiGo 48", "6E148", "IndiGo", kolkata, mumbai, LocalDate.of(2025, 10, 18), LocalDate.of(2025, 10, 18), 5500.0, "18:50"),
//            	    new Flight("SpiceJet 49", "SG149", "SpiceJet", goa, delhi, LocalDate.of(2025, 10, 19), LocalDate.of(2025, 10, 19), 6400.0, "21:35"),
//            	    new Flight("Air India 50", "AI150", "Air India", delhi, newyork, LocalDate.of(2025, 10, 20), LocalDate.of(2025, 10, 21), 49000.0, "23:45")
//            	);
//
//            flightRepository.saveAll(flights);
//        };
 //   }
	}

