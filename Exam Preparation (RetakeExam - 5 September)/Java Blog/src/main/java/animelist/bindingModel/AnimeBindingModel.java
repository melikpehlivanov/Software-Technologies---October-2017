package animelist.bindingModel;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class AnimeBindingModel {
    private Integer rating;

    private String name;

    private String description;

    private String watched;

    public AnimeBindingModel() {
    }

    public AnimeBindingModel(Integer rating, String name, String description, String watched) {
        this.rating = rating;
        this.name = name;
        this.description = description;
        this.watched = watched;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWatched() {
        return watched;
    }

    public void setWatched(String watched) {
        this.watched = watched;
    }
}
