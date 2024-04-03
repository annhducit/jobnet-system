package com.jobnet.notification.listeners;

import com.jobnet.common.dtos.EmailVerification;
import com.jobnet.notification.email.EmailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaMessageListener {

    private final EmailSender emailSender;

    @KafkaListener(topics = "user-registration", id = "user-registration-consumer")
    public void userRegistrationListener(EmailVerification emailVerification) {
        emailSender.send(
            emailVerification.recipient(),
            "Hello %s, your confirmation OTP is: %s"
                .formatted(emailVerification.recipientName(), emailVerification.otpToken())
        );
        log.info("Send confirmation OTP to email {}", emailVerification.recipient());
    }
}
