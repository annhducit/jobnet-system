package com.jobnet.post;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.math.BigInteger;

@SpringBootApplication
@ComponentScan({
    "com.jobnet.post",
    "com.jobnet.common.configs",
    "com.jobnet.common.advice",
    "com.jobnet.common.s3",
    "com.jobnet.common.utils"
})
@EnableFeignClients("com.jobnet.clients")
@EnableScheduling
public class PostApplication {

    public static void main(String[] args) {
        SpringApplication.run(PostApplication.class, args);
    }
}
