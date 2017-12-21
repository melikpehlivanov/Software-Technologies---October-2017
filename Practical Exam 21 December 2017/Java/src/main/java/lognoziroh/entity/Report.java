package lognoziroh.entity;

import javax.persistence.*;

@Entity
@Table(name = "reports")
public class Report {
    private Integer id;
    private String status;
    private String message;
    private String origin;

    public Report() {
    }

    public Report(String status, String message, String origin) {
        this.status = status;
        this.message = message;
        this.origin = origin;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(nullable = false)
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Column(nullable = false)
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Column(nullable = false)
    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }
}
