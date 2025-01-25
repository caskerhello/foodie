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
//        if( word==null || word.equals("") ) {

            Paging paging = new Paging();
            paging.setPage(page);
            paging.calPaing();

            list = pr.findAll(Sort.by(Sort.Direction.DESC, "postid"));
            paging.setTotalCount(list.size());
            paging.getStartNum();

        System.out.println("paging.getStartNum();:"+paging.getStartNum());


        Pageable pageable = PageRequest.of(page-1, 2, Sort.by(Sort.Order.desc("postid")));

//        System.out.println("pr.findAllByOrderByPostidDesc(pageable) :"+pr.findAllByOrderByPostidDesc(pageable));

        System.out.println("pmv.findAllByOrderByPostidDesc(pageable) :"+pmv.findAllByOrderByPostidDesc(pageable));

//        return pr.findAllByOrderByPostidDesc(pageable);

//        return pmv.findAllByOrderByPostidDesc(pageable);

        return pmpv.findAllByOrderByPostidDesc(pageable);



//            return pr.findAll(paging);


//        }
//        else{
            // word로 hashtag 테이블 검색
            // select id from hashtag where word=?

            // 검색결과에 있는 tagid 들로  posthash테이블에서 postid 들을 검색
            // select postid from posthash where hashid=?

            // postid 들로 post 테이블에서  post 들을 검색
            // select * from post where id=?

//            Optional<Hashtag> record = hr.findByWord(word);  // word 를 hasgtag 테이블에서 검색
//            if( !record.isPresent() ) {
//                list = pr.findAll(Sort.by(Sort.Direction.DESC, "id"));  // 검색 결과가 없으면 모두 검색
//            }else{
//                // hashtag 테이블의 id : record.get().getId()
//                List<PostHash> phList = phr.findByHashid(  record.get().getId() );   // hashid로 PostHash 테이블 검색
//
//                List<Integer> poistidList = new ArrayList<>();
//                for( PostHash ph : phList ) {    // PostHash 들에서 postid 만 추출해서 List(poistidList) 로 재구성
//                    poistidList.add( ph.getPostid() );
//                }

//                list = pr.findByIdIn( poistidList );  // poistidList 로 Post 테이블 검색
//            }
//        }
//        return returnpage;
    }

    public List<Images> getImagesList(int postid) {
        List<Images> list = ir.findByPostid( postid );
        return list;
    }

    @Autowired
    LikesRepository lr;

    public List<Likes> getLikeList(int postid) {
        System.out.println("PostService postid:"+postid);
        List<Likes> list = lr.findByPostid( postid );
        System.out.println("PostService list:"+list);
        // [ { id:1, postid:3, likeid:5} , {  id:2, postid:4, likeid:6} , {} ... ]  좋아요 테이블의 레코드 객체 리스트
        // [ 5, 4 , 6, ...]  멤버의 아이디들 리스트
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
        // rr.findByPostidOrderByReplyidDesc(postid);
        return rmv.findByPostidOrderByReplyidDesc(postid);
    }

    public void deleteReply(int replyid) {
        Optional<Reply> rep = rr.findById((long)replyid);
        if( rep.isPresent() ) {
            rr.delete( rep.get() );
        }
    }

//    public List getMyPosts(int memberid) {
//        return pr.findAllByMemberid(memberid);
//    }

    public List<Post> getPostListByMemberid(int memberid) {
        return pr.findAllByMemberidOrderByPostidDesc(memberid);
    }

    public List<Images> getImgListByPostidOrderByPostidDesc(int id) {
        return ir.findByPostidOrderByPostidDesc( id );
    }

//    public Post getPost(int id) {
//        Optional<Post> p = pr.findByPostid(id);
//
//        if( p.isPresent() ){
//            return p.get();
//        }else{
//            return null;
//        }
//    }

    public PostMemberPlaceView getPost(int id) {
        Optional<PostMemberPlaceView> p = pmpv.findByPostid(id);

        if( p.isPresent() ){
            return p.get();
        }else{
            return null;
        }
    }

    public List<PostMemberPlaceView> getPostListByPlaceid(int placeid) {
//        return pr.findAllByPlaceid(placeid);
        return pmpv.findAllByPlaceid(placeid);
    }
}
