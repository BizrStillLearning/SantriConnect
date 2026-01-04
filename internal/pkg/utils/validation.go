package utils

import "regexp"

func CheckPassword(password string) bool {
	if len(password) < 8 {
		return false
	}

	matchLow, _ := regexp.MatchString(`[a-z]`, password)
	matchUpp, _ := regexp.MatchString(`[A-Z]`, password)
	matchNum, _ := regexp.MatchString(`[0-9]`, password)
	matchSpec, _ := regexp.MatchString(`[!@#\$%\^&\*]`, password)

	return matchLow && matchUpp && matchNum && matchSpec
}
