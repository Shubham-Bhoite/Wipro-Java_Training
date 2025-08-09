<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<html>
<head>
    <title>User Registration</title>
</head>
<body>
<h2>User Registration</h2>

<form action="/user/save" method="post">
    Username: <input type="text" name="username" /><br/><br/>
    Email: <input type="text" name="userEmail" /><br/><br/>
    Phone: <input type="text" name="userPhone" /><br/><br/>
    <input type="submit" value="Register"/>
</form>

</body>
</html>
