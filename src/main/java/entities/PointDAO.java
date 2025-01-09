package entities;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;

import java.io.Serializable;
import java.util.List;

@Named
@ApplicationScoped
public class PointDAO implements Serializable {

    public void save(Point point) {
        EntityManager entityManager = EntityManagerProvider.getEntityManager();
        entityManager.getTransaction().begin();
        entityManager.persist(point);
        entityManager.getTransaction().commit();
        entityManager.close();
    }

    public List<Point> findAll() {
        EntityManager entityManager = EntityManagerProvider.getEntityManager();
        return entityManager.createQuery("SELECT p FROM Point p", Point.class).getResultList();
    }
}
