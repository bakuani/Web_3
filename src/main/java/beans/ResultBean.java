package beans;

import entities.EntityManagerProvider;
import entities.Point;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.persistence.*;
import java.util.List;

@Named
@ApplicationScoped
public class ResultBean {
    private final EntityManager em = EntityManagerProvider.getEntityManager();
    private List<Point> results;
}
