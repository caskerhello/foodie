package com.foodie.foodie.controller;

import com.foodie.foodie.entity.Images;
import com.foodie.foodie.entity.Place;
import com.foodie.foodie.entity.Post;
import com.foodie.foodie.service.PlaceService;
import com.foodie.foodie.service.PostService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService ps;



    @Autowired
    ServletContext context;
    @PostMapping("/imgup")
    public HashMap<String, Object> fileup(
            @RequestParam("image") MultipartFile file ){
        HashMap<String, Object> result = new HashMap<String, Object>();
        String path = context.getRealPath("/uploads");
        Calendar today = Calendar.getInstance();
        long dt = today.getTimeInMillis();
        String filename = file.getOriginalFilename();
        String fn1 = filename.substring(0, filename.indexOf(".") );
        String fn2 = filename.substring(filename.indexOf(".") );
        String uploadPath = path + "/" + fn1 + dt + fn2;
        try {
            file.transferTo( new File(uploadPath) );
            result.put("savefilename", fn1 + dt + fn2);
        } catch (IllegalStateException | IOException e) {e.printStackTrace();}
        return result;
    }




    @PostMapping("/writePost")
    public HashMap<String, Object> writePost(
            @RequestBody Post post, HttpSession session
            ){
        HashMap<String, Object> result = new HashMap<String, Object>();

        System.out.println("post"+post);

        Post p = ps.insertPost(post);  // 방금 추가된 레코드의 id 를위해 추가된 레코드를 리턴

        System.out.println("리턴될 post"+p);
        result.put("postid", p.getPostid() );
        return result;
    }

    @PostMapping("/writeImages")
    public HashMap<String, Object> writeimages( @RequestBody Images images){
        HashMap<String, Object> result = new HashMap<String, Object>();
        System.out.println("writeimages");
        System.out.println("images:"+images);
        ps.insertImages(images);
        return result;
    }


}
