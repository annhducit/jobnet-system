package com.jobnet.wishlist.services.Impl;

import com.jobnet.clients.post.PostClient;
import com.jobnet.clients.post.PostResponse;
import com.jobnet.common.dtos.PaginationResponse;
import com.jobnet.common.exceptions.DataIntegrityViolationException;
import com.jobnet.common.exceptions.ResourceNotFoundException;
import com.jobnet.common.utils.MongoUtil;
import com.jobnet.wishlist.dtos.requests.WishlistRequest;
import com.jobnet.wishlist.dtos.responses.WishlistResponse;
import com.jobnet.wishlist.mappers.WishlistMapper;
import com.jobnet.wishlist.models.Wishlist;
import com.jobnet.wishlist.repositories.WishlistRepository;
import com.jobnet.wishlist.services.IWishlistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WishlistService implements IWishlistService {

    private final WishlistRepository wishlistRepository;
    private final PostClient postClient;
    private final WishlistMapper wishlistMapper;

    @Override
    public PaginationResponse getWishlistsByUserId(String userId, Integer page, Integer pageSize, List<String> sortBy) {
        Pageable pageable = PageRequest.of(
            page - 1,
            pageSize,
            MongoUtil.getSort(sortBy)
        );

        Page<Wishlist> wishlistPage = wishlistRepository.findAllByUserId(userId, pageable);
        long totalElements = wishlistPage.getTotalElements();
        int totalPages = wishlistPage.getTotalPages();
        int currentPage = wishlistPage.getNumber() + 1;
        boolean hasNextPage = wishlistPage.hasNext();
        List<WishlistResponse> wishlistResponses = wishlistPage.getContent().stream()
            .map(this::getWishlistResponse)
            .toList();

        log.info("Get wishlist by auth - userId={}, page={}, pageSize={}: {}", userId, page, pageSize, wishlistResponses);
        return PaginationResponse.builder()
            .totalElements(totalElements)
            .totalPages(totalPages)
            .currentPage(currentPage)
            .hasNextPage(hasNextPage)
            .data(wishlistResponses)
            .build();
    }

    @Override
    public WishlistResponse createWishlist(String userId, WishlistRequest wishlistRequest) {

        if (wishlistRepository.existsByUserIdAndPostId(
            userId,
            wishlistRequest.getPostId()
        ))
            throw new DataIntegrityViolationException("Wishlist already exists.");

        PostResponse postResponse = postClient.getPostById(wishlistRequest.getPostId());

        Wishlist _wishlist = wishlistMapper.convertToWishlist.apply(wishlistRequest);
        _wishlist.setUserId(userId);
        _wishlist.setCreatedAt(LocalDate.now());
        Wishlist wishlist = wishlistRepository.save(_wishlist);

        WishlistResponse wishlistResponse = wishlistMapper.convertToWishlistResponse.apply(wishlist);
        wishlistResponse.setUserId(wishlist.getUserId());
        wishlistResponse.setPost(postResponse);

        log.info("Create wishlist by auth - userId={}, request={}: {}",
            userId, wishlistRequest, wishlistResponse
        );
        return wishlistResponse;
    }

    @Override
    public void deleteWishlist(String userId, WishlistRequest wishlistRequest) {

        if (!wishlistRepository.existsByUserIdAndPostId(
            userId,
            wishlistRequest.getPostId()
        ))
            throw new ResourceNotFoundException("Wishlist not found.");

        log.info("Delete wishlist by auth - userId={}: {}",
            userId, wishlistRequest
        );
        wishlistRepository.deleteByUserIdAndPostId(
            userId,
            wishlistRequest.getPostId()
        );
    }

    @Override
    public boolean existsWishlist(String jobSeekerId, String postId) {
        return wishlistRepository.existsByUserIdAndPostId(jobSeekerId, postId);
    }

    private WishlistResponse getWishlistResponse(Wishlist wishlist) {
        PostResponse postResponse = postClient.getPostById(wishlist.getPostId());
        WishlistResponse wishlistResponse = wishlistMapper.convertToWishlistResponse.apply(wishlist);
        wishlistResponse.setUserId(wishlist.getUserId());
        wishlistResponse.setPost(postResponse);
        return wishlistResponse;
    }
}
