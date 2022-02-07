package com.project.bicycle_second_attempt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
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
    public Map<String,String> login(
            @RequestBody User user,
            Model model,
            HttpSession session) {

        List<User> userData = uService.findUser(user.getUserid());
        Map<String, String> data = new HashMap<String, String>();
        System.out.println(userData);
        if (userData.size() <= 0) {
            System.out.println("register id: "+userData);
           data.put("data", "no");
        } else {
            if (user.getPassword().equals(userData.get(0).getPassword())) {
                session.setAttribute("id", user.getUserid());
                System.out.println("logined"+userData);
                data.put("data", "welcome");
            } else {
                System.out.println("not matched! : pwd" + userData.get(0).getPassword());
                data.put("data", "wrong");
            }
        }
        return data;
    }

    @PostMapping("/register")
    public String loginData(@ModelAttribute User user) {
        List<User> userData = uService.findUser(user.getUserid());
       

        return "index";
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
