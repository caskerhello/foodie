package com.foodie.foodie.service;

import com.foodie.foodie.dto.Paging;
import com.foodie.foodie.entity.*;
import com.foodie.foodie.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PostService {
    @Autowired
    PostRepository pr;

    @Autowired
    postmemberview pmv;

    @Autowired
    postmemberplaceview pmpv;

    @Autowired
    ImagesRepository ir;

    public Post insertPost(Post post) {

        // 포스트 추가
        Post p = pr.save( post ); // 레코드 추가 + 방금 추가된 레코드를 새로운 엔티티 객체에 저장
        int postid= p.getPostid(); // 방금 추가된 레코드의 id저장

        return p;
    }

    public void insertImages(Images images) {
        ir.save(images);
    }

    public Page<PostMemberPlaceView> getPostList(String word, int page) {
        List<Post> list=null;
        List<Post> list2=null;

            Paging paging = new Paging();
            paging.setPage(page);
            paging.calPaing();

            list = pr.findAll(Sort.by(Sort.Direction.DESC, "postid"));
            paging.setTotalCount(list.size());
            paging.getStartNum();

        Pageable pageable = PageRequest.of(page-1, 2, Sort.by(Sort.Order.desc("postid")));

        return pmpv.findAllByOrderByPostidDesc(pageable);
    }

    public List<Images> getImagesList(int postid) {
        List<Images> list = ir.findByPostid( postid );
        return list;
    }

    @Autowired
    LikesRepository lr;

    public List<Likes> getLikeList(int postid) {
        List<Likes> list = lr.findByPostid( postid );
        return list;
    }

    public void insertLikes(Likes likes) {
        Optional<Likes> recored = lr.findByPostidAndMemberid( likes.getPostid(), likes.getMemberid());
        if( recored.isPresent() ) {
            lr.delete( recored.get() );
        }else{
            Likes addlikes = new Likes();
            addlikes.setPostid( likes.getPostid());
            addlikes.setMemberid( likes.getMemberid() );
            lr.save( addlikes );
        }
    }

    @Autowired
    ReplyRepository rr;

    @Autowired
    replymemberview rmv;

    public void addReply(Reply reply) {
        rr.save(reply);
    }

    public List<ReplyMemberView> getReplyList(int postid) {
        return rmv.findByPostidOrderByReplyidDesc(postid);
    }

    public void deleteReply(int replyid) {
        Optional<Reply> rep = rr.findById((long)replyid);
        if( rep.isPresent() ) {
            rr.delete( rep.get() );
        }
    }

    public List<Post> getPostListByMemberid(int memberid) {
        return pr.findAllByMemberidOrderByPostidDesc(memberid);
    }

    public List<Images> getImgListByPostidOrderByPostidDesc(int id) {
        return ir.findByPostidOrderByPostidDesc( id );
    }


    public PostMemberPlaceView getPost(int id) {
        Optional<PostMemberPlaceView> p = pmpv.findByPostid(id);

        if( p.isPresent() ){
            return p.get();
        }else{
            return null;
        }
    }

    public List<PostMemberPlaceView> getPostListByPlaceid(int placeid) {
        return pmpv.findAllByPlaceid(placeid);
    }

    public List<PostMemberPlaceView> getPostListTop4(int memberid) {
        return pmpv.findTop4ByMemberidOrderByPostidDesc(memberid);
    }
}
