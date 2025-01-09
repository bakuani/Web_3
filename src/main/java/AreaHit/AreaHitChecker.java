package AreaHit;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Named;
import entities.Point;

@Named
@RequestScoped
public class AreaHitChecker {
    public boolean validate(Point point){
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        if (x>=-r/2 && x<=0 && y<=r/2 && y>=0 && (x * x + y * y <= r * r)){
            return true;
        }
        if (x>=r && x<=0 && y>=-r/2 && y<=0){
            return true;
        }
        if (x<=r/2 && x>=0 && y>=-r && y<=0 && (y>=2*x-r)){
            return true;
        }

        return false;
    }
}
