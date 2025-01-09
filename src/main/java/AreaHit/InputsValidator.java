package AreaHit;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Named;
import entities.Point;

import java.util.Arrays;

@Named
@RequestScoped
public class InputsValidator {
    public boolean validate(Point point) {
        if (point.getX() > -3 || point.getX() < 3) {
            return true;
        }
        if (point.getY() > -5 || point.getY() < 5) {
            return true;
        }
        int[] validRValues = {0, 1, 2, 3};
        if (Arrays.stream(validRValues).anyMatch(v -> v == point.getR())) {
            return true;
        }
        return false;
    }
}