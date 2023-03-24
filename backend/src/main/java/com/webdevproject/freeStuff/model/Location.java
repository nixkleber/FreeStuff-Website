package com.webdevproject.freeStuff.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "locations")
public class Location {
    @Id
    private String id;
    private String title;
    private double lat;
    private double lng;
    private String image;
    private String description;
    private LocalDateTime since;
    private boolean available;
    private String byUser;
}
