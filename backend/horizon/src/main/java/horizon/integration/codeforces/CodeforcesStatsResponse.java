package horizon.integration.codeforces;

public class CodeforcesStatsResponse {

    private int totalSubmissions;
    private int acceptedSubmissions;
    private int problemsSolved;

    public CodeforcesStatsResponse(
            int totalSubmissions,
            int acceptedSubmissions,
            int problemsSolved
    ) {
        this.totalSubmissions = totalSubmissions;
        this.acceptedSubmissions = acceptedSubmissions;
        this.problemsSolved = problemsSolved;
    }

    public int getTotalSubmissions() {
        return totalSubmissions;
    }

    public int getAcceptedSubmissions() {
        return acceptedSubmissions;
    }

    public int getProblemsSolved() {
        return problemsSolved;
    }
}