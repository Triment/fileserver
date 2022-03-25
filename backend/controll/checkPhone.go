package controll

import (
	"io/ioutil"
	"net/http"

	"github.com/Triment/eject"
)

func CheckoutPhone(c *eject.Context) {
	res, err := http.Get("https://mdp-admin.yimidida.com/api/mdpEmp/getEmpWithoutUser?mobile=" + c.Params["phone"] + "&ymEmpCode=&status=0")
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()
	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}
	c.Res.Write(data)
}
