package com.foodie.foodie.service;

import com.foodie.foodie.repository.ImagesRepository;
import com.foodie.foodie.repository.PostRepository;
import com.foodie.foodie.entity.Post;
import com.foodie.foodie.entity.Images;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PostService {
    @Autowired
    PostRepository pr;

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

    public List<Post> getPostList(String word) {
        List<Post> list=null;
        if( word==null || word.equals("") ) {
            list = pr.findAll(Sort.by(Sort.Direction.DESC, "postid"));
        }else{
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
        }
        return list;
    }

    public List<Images> getImagesList(int postid) {
        List<Images> list = ir.findByPostid( postid );
        return list;
    }
}
