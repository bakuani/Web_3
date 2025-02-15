package beans;

import AreaHit.AreaHitChecker;
import AreaHit.InputsValidator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import entities.Point;
import entities.PointDAO;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.transaction.Transactional;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Named
@ApplicationScoped
public class PointBean implements Serializable {
    private static final Logger logger = Logger.getLogger(PointBean.class.getName());

    @Inject
    private PointDAO dao;

    @Inject
    private InputsValidator inputsValidator;

    @Inject
    private AreaHitChecker areaHitChecker;

    private Point newPoint = new Point();
    private final List<Point> results = new ArrayList<>();


    @PostConstruct
    public void init() {
        List<Point> points = dao.findAll();
        if (points != null) {
            results.addAll(points);
        }
    }

    public void addPoint() {
        try {
            logger.info("checking");
            if (inputsValidator.validate(newPoint)) {
                logger.info("it's okay");
                newPoint.setHit(areaHitChecker.validate(newPoint));
                dao.save(newPoint);
                results.add(newPoint);
                newPoint = new Point();
            }
        } catch (Exception e) {
            logger.severe("Ошибка: " + e.getMessage());
            FacesContext.getCurrentInstance()
                    .addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Ошибка", "Произошла ошибка при добавлении точки."));
        }
    }

    public Point getNewPoint() {
        return newPoint;
    }

    public void setNewPoint(Point newPoint) {
        this.newPoint = newPoint;
    }

    public List<Point> getResults() {
        return results;
    }

}
