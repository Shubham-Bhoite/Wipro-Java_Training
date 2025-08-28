package com.wipro.usermgmt.service.impl;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

import com.wipro.usermgmt.dto.Token;
import com.wipro.usermgmt.entity.User;
import com.wipro.usermgmt.repo.UserRepo;
import com.wipro.usermgmt.service.UserService;
import com.wipro.usermgmt.util.AppConstant;
import com.wipro.usermgmt.util.EncryptUtil;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepo userRepo;

    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }

    @Override
    public User findById(int id) {
        Optional<User> userOpt = userRepo.findById(id);
        return userOpt.orElse(null);
    }

    @Override
    public void save(User user) {
        // ✅ Always encrypt password before saving
        String salt = EncryptUtil.getSalt(); // generate new salt
        String encryptedPassword = EncryptUtil.getEncryptedPassword(user.getPassWord(), salt);

        user.setSalt(salt);
        user.setPassWord(encryptedPassword);

        userRepo.save(user);
    }

    @Override
    public void deleteById(int id) {
        userRepo.deleteById(id);
    }

    @Override
    public Token login(User user) {
        // find user by email
        User userSalt = userRepo.findByUserEmail(user.getUserEmail());

        if (userSalt == null) {
            return null; // email not found
        }

        // encrypt incoming password with stored salt
        String encryptedPassword = EncryptUtil.getEncryptedPassword(user.getPassWord(), userSalt.getSalt());

        // check email + password match
        User userData = userRepo.findByUserEmailAndPassWord(user.getUserEmail(), encryptedPassword);

        if (userData != null) {
            String userId = String.valueOf(userData.getId());

            String jwtToken = "Bearer " + getJWTToken(userId);
            Token token = new Token();
            token.setToken(jwtToken);

            return token;
        }
        return null; // wrong password
    }

    private String getJWTToken(String userId) {
        Key key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(AppConstant.SECRET));

        List<GrantedAuthority> grantedAuthorities =
                AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");

        return Jwts.builder()
                .setId("jwtExample")
                .setSubject(userId)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 600000)) // 10 min
                .signWith(key)
                .compact();
    }
}
