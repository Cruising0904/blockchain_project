package com.project.bicycle_second_attempt.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.project.bicycle_second_attempt.dto.Board;
import com.project.bicycle_second_attempt.dto.User;
import com.project.bicycle_second_attempt.service.NoticeService;
import com.project.bicycle_second_attempt.service.ReportService;
import com.project.bicycle_second_attempt.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    @Autowired
    UserService uService;
    @Autowired
    NoticeService noticeService;
    @Autowired
    ReportService reportService;

    @GetMapping("/")
    public String root(Model model) {
        // model.addAttribute("list", "null");
        return "index";
    }

    @PostMapping("/login")
    @ResponseBody
    public void login(
            @RequestBody User user,
            Model model,
            HttpSession session) {
        List<User> result = uService.findUser(user.getId(), user.getPassword());
        if (result.size() <= 0) {
            System.out.println("go to register");
        } else {
            if (user.password.equals(result.get(0).password)) {
                session.setAttribute("id", user.id);
                System.out.println("logined");

            } else {
                System.out.println("not matched!" + result.get(0).password);
            }
        }
        // return result;
    }

    @PostMapping("/register")
    @ResponseBody
    public void loginData(
            @RequestBody User user) {
        uService.insetUser(user.getId(), user.getPassword());
        // return "index";
    }

    @PostMapping("/list")
    @ResponseBody
    public void list() {
        uService.findUsers();
    }

    @PostMapping("/logout")
    @ResponseBody
    public void logout(
            HttpSession session) {
        session.invalidate();
    }

    @PostMapping("/notice")
    @ResponseBody
    public List<Board> notice() {
        List<Board> result = new ArrayList<Board>();
        result = noticeService.getNotice();
        // System.out.println(result);
        return result;
    }

    @PostMapping("/report")
    @ResponseBody
    public List<Board> report() {
        // ModelAndView mv = new ModelAndView();
        List<Board> result = new ArrayList<Board>();
        // System.out.println("report");
        result = reportService.getBoards();
        // System.out.println(result);
        // mv.setViewName("index");
        // mv.addObject("list", result);

        return result;
    }

}
