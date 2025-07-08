package com.demo.bookmanagementsystem.entity;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data // Lombok注解：自动为您生成getters、setters、toString等方法
@Entity // JPA注解：告诉Spring这是一个实体类，它会对应数据库中的一个表
public class User {

    @Id // JPA注解：指定这个字段是主键
    @GeneratedValue(strategy = GenerationType.IDENTITY) // JPA注解：设置主键的生成策略为自增长
    private Integer id;

    private String username;
    private String password;
    private String phone;

    // 您不再需要手动编写 getters 和 setters 了，@Data 注解会帮您搞定！
}