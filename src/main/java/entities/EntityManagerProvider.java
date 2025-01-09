package entities;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Persistence;
import jakarta.persistence.EntityManagerFactory;

public class EntityManagerProvider {

    private static final EntityManagerFactory entityManagerFactory =
            Persistence.createEntityManagerFactory("ResultsPU");

    public static EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }
}