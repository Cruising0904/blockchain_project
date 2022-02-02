package com.project.bicycle_second_attempt.controller;

import com.project.bicycle_second_attempt.dto.User;
import com.project.bicycle_second_attempt.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @Autowired
    UserService uService;

    @GetMapping("/")
    public String root() {
        return "index";
    }

    @GetMapping("list")
    public String list() {
        return "list";
    }

    @PostMapping("/login")
    @ResponseBody
    public String loginData(
            @RequestBody User user
            // @RequestParam String id,
            // @RequestParam String email,
            // @RequestBody String phoneNumber,
            // @RequestBody String password,
            // Model model
            ) {
        // System.out.println("post 호출");
        // System.out.println("user = "+ user);
        // System.out.println("phoneNum = "+ user.getPhoneNum());
        // System.out.println("password = "+ user.getPassword());
        // System.out.println("phoneNumber : " + phoneNumber);
        // System.out.println("password : " + password);
        // System.out.println(id);
        uService.insetUser(user.getPhoneNum(), user.getPassword());
        return "index";
    }

}
