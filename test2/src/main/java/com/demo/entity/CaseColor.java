package com.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "casecolors")
public class CaseColor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    String code;
    String name;
    String created_by;
    String updated_by;
    Date created_date;
    Date update_date;
    Integer is_deleted;

    @JsonIgnore
    @OneToMany(mappedBy = "casecolor")
    List<WatchDetail> watchdetails;
}
