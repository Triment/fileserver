package controll

import (
	"github.com/Triment/eject"
)

func CrosMiddle(c *eject.Context) {
	c.Res.Header().Set("Access-Control-Allow-Origin", "*")
}
