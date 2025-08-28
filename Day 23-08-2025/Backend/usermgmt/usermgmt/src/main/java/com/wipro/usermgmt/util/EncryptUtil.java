package com.wipro.usermgmt.util;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class EncryptUtil {

    // Generate a new salt
    public static String getSalt() {
        return BCrypt.gensalt();
    }

    // Encrypt password with provided salt
    public static String getEncryptedPassword(String plainPassword, String salt) {
        if (plainPassword == null || salt == null) {
            throw new IllegalArgumentException("Password and salt cannot be null");
        }
        return BCrypt.hashpw(plainPassword, salt);
    }

    // Verify raw password against stored hash
    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        if (plainPassword == null || hashedPassword == null) {
            return false;
        }
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }

    public static void main(String[] args) {
        // Example usage
        String salt = getSalt();
        String hashed = getEncryptedPassword("pass", salt);

        System.out.println("Salt: " + salt);
        System.out.println("Hashed: " + hashed);

        System.out.println("Match? " + checkPassword("pass", hashed));
    }
}
