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

    // @GetMapping("/list")
    // // @ResponseBody
    // public String list(

    // ) {
    //     // System.out.println(uService.findUsers());
    //     uService.findUsers();

    //     return "index";
    // }

    @PostMapping("/login")
    @ResponseBody
    public void find(
            @RequestBody User user) {
        uService.findUser(user.getPhoneNum(), user.getPassword());
        // return "index";
    }
    @PostMapping("/register")
    @ResponseBody
    public void loginData(
            @RequestBody User user) {
        uService.insetUser(user.getPhoneNum(), user.getPassword());
        // return "index";
    }
    @PostMapping("/list")
    @ResponseBody
    public void list() {
        uService.findUsers();
    }

}
