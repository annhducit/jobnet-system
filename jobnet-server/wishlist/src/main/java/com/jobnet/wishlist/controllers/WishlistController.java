package com.jobnet.wishlist.controllers;

import com.jobnet.common.dtos.PaginationResponse;
import com.jobnet.wishlist.dtos.requests.WishlistRequest;
import com.jobnet.wishlist.dtos.responses.WishlistResponse;
import com.jobnet.wishlist.services.IWishlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/wishlists")
@RequiredArgsConstructor
@Slf4j
public class WishlistController {

    private final IWishlistService wishlistService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationResponse getWishlists(
        @RequestHeader String userId,
        @RequestParam(defaultValue = "1") Integer page,
        @RequestParam(defaultValue = "10") Integer pageSize,
        @RequestParam(defaultValue = "createdAt,desc") List<String> sortBy
    ) {
        PaginationResponse response = wishlistService.getWishlistsByUserId(
            userId,
            page,
            pageSize,
            sortBy
        );

        log.info("Get wishlists by userId successfully!");
        return response;
    }

    @GetMapping("exists")
    @ResponseStatus(HttpStatus.OK)
    public boolean existsWishlist(
        @RequestHeader String userId,
        @RequestParam String postId
    ) {
        boolean isExist = wishlistService.existsWishlist(userId, postId);

        log.info("Exists wishlist by userId and postId");
        return isExist;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WishlistResponse createWishlist(
        @RequestHeader String userId,
        @RequestBody @Valid WishlistRequest wishlistRequest
    ) {
        WishlistResponse wishlistResponse = wishlistService.createWishlist(userId, wishlistRequest);

        log.info("Create wishlist by userId successfully: {}", wishlistResponse);
        return wishlistResponse;
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWishlist(
        @RequestHeader String userId,
        @RequestBody @Valid WishlistRequest wishlistRequest
    ) {
        wishlistService.deleteWishlist(userId, wishlistRequest);
        log.info("Delete wishlist by userId successfully!");
    }

}