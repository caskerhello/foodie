package com.foodie.foodie.controller;

import com.foodie.foodie.entity.*;
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
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService ps;



    @Autowired
    ServletContext context;
    @PostMapping("/imgUp")
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

    @Autowired
    private PostService postService;

    @GetMapping("/getPostList")
    public HashMap<String, Object> getPostList(
            @RequestParam("page") int page,
            @RequestParam(value="word", required = false) String word) {
        HashMap<String,Object> result = new HashMap<>();

        result.put("postList", ps.getPostList( word , page ) );

        return result;
    }

    @GetMapping("/getImages/{postid}")
    public HashMap<String,Object> getImages(@PathVariable("postid") int postid) {
        HashMap<String,Object> result = new HashMap<>();
        result.put("imgList", ps.getImagesList( postid ) );
        return result;
    }


    @GetMapping("/getLikeList/{postid}")
    public HashMap<String,Object> getLikeList(@PathVariable("postid") int postid) {
        HashMap<String,Object> result = new HashMap<>();
        result.put("likeList", ps.getLikeList( postid ) );
        return result;
    }


    @PostMapping("/addLike")
    public HashMap<String,Object> addLike(@RequestBody Likes likes) {
        HashMap<String,Object> result = new HashMap<>();

        ps.insertLikes(likes);
        result.put("msg", "ok");
        return result;
    }



    @PostMapping("/addReply")
    public HashMap<String,Object> addReply(@RequestBody Reply reply) {
        HashMap<String,Object> result = new HashMap<>();
        ps.addReply(reply);
        result.put("msg", "ok");
        return result;
    }


    @GetMapping("/getReplyList/{postid}")
    public HashMap<String,Object> getReplyList(@PathVariable("postid") int postid) {
        HashMap<String,Object> result = new HashMap<>();
        List<ReplyMemberView> list = ps.getReplyList( postid );
        result.put("replyList", list );
        return result;
    }

    @DeleteMapping("/deleteReply/{replyid}")
    public HashMap<String,Object> deleteReply(@PathVariable("replyid") int replyid) {
        HashMap<String,Object> result = new HashMap<>();
        ps.deleteReply( replyid );
        result.put("msg", "ok");
        return result;

    }

    //여기 id는 postid
    @GetMapping("/getPost/{id}")
    public Post getPost( @PathVariable("id") int id){
        return ps.getPost(id);
    }


    @GetMapping("/findPost")
    public HashMap<String, Object> findPost(@RequestParam("placeid") int placeid) {
        HashMap<String, Object> result = new HashMap<>();
        System.out.println("placeid:"+placeid);

        result.put("postList", ps.getPostListByPlaceid(placeid));
        return result;
    }




}
