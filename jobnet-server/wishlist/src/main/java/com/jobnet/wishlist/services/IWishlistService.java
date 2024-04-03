package com.jobnet.wishlist.services;

import com.jobnet.common.dtos.PaginationResponse;
import com.jobnet.wishlist.dtos.requests.WishlistRequest;
import com.jobnet.wishlist.dtos.responses.WishlistResponse;

import java.util.List;

public interface IWishlistService {

    PaginationResponse getWishlistsByUserId(String userId, Integer page, Integer pageSize, List<String> sortBy);

    WishlistResponse createWishlist(String userId, WishlistRequest wishlistRequest);

    void deleteWishlist(String userId, WishlistRequest wishlistRequest);

    boolean existsWishlist(String userId, String postId);
}
