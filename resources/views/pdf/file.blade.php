<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        @page {
            size: a4 portrait;
            margin: 0.9;
            padding: 0.9; // you can set margin and padding 0
        }
        body {
            font-family: Times New Roman;
            font-size: 15px;
            text-align: center;
            border: thin solid black;
        }
    </style>

</head>
<body>
<div>
    @foreach($barangs as $br)
        <div style=" display: block; margin-left: auto; margin-right: auto; margin-top: 50px; width: 50%;">
            @switch($type)
                @case('barcode')
                <p style="text-align: center">{{$br->kode_barang}}</p>
                <img src="data:image/png;base64,{{DNS1D::getBarcodePNG($br->barcode, 'C128')}}"/>
                @break
                @case('qrcode')
                <p style="text-align: center">{{$br->kode_barang}}</p>
                <img src="data:image/png;base64, {{DNS2D::getBarcodePNG($br->barcode, 'QRCODE')}}"/>
                @break
            @endswitch

        </div>
    @endforeach
</div>
</body>
</html>
