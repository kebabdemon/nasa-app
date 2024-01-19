# Layout

```kotlin

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shadow
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.Role.Companion.Image
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.testcompose.ui.theme.TestComposeTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TestComposeTheme {
             // Tasks("Filip")
               // Layout()
              // Complex()
               // BigText()
               // OverflowText()

                // textModifier()

                Tasks()
            }
        }
    }
}

@Composable
fun Tasks(name: String){
    Text(text="Hello $name", color = Color.Green)
}

@Composable
fun Layout(){
    Column {
        Text(text = "Top")
        Text("Bottom")

        Text("Test")
        Text(text="Test")
    }
}

@Composable
fun Complex(){
    Row {
        Text("Left")
        Text("Right")
    }
}

@Composable
fun BigText(){

    val offset = Offset(5.0f, 10.0f)

    Text("Big text",
        fontSize = 60.sp,
        color=Color.Blue,
        fontWeight = FontWeight.Bold,
        fontStyle = FontStyle.Italic,
        style= TextStyle(
           shadow = Shadow(
               color=Color.Green,
               offset = offset,
               blurRadius = 3f
           )
        )
    )
}
/*
@Composable
fun gradientText(){
    Text(
        text="Gradient",
        style=TextStyle(
            brush = Brush.linearGradient(
                colors = listOf(Color.Cyan, Color.Green)
            )
        )
    )
}*/

@Composable
fun OverflowText(){
    Text("Hello Compose".repeat(50),
        maxLines = 3,
        overflow = TextOverflow.Ellipsis)
}
/*
@Composable
fun myImage(){
    Image(
        painter= painterResource(id = androidx.core.R.drawable.notification_bg_normal)

    )
}*/


@Composable
fun textModifier(){
    Column {
        Text("Modifier A",
            modifier = Modifier
                .padding(30.dp)
                .border(BorderStroke(3.dp, Color.Green)))

        Text("Modifier B",
            modifier = Modifier.padding(30.dp))
    }
}
```
