package beans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Named
@ApplicationScoped
public class ClockBean {
    private String currentTime;

    public ClockBean() {
        updateTime();
    }

    public void updateTime() {
        currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public String getCurrentTime() {
        return currentTime;
    }
}
